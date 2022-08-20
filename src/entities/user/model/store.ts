import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormLoadingError, isUserData, UserData, UserState } from './interface';
import * as usersApi from 'shared/api/users';
import { handleAuthorizationChange } from '../lib';
import { RootState, AppDispatch, AsyncThunkConfig } from 'app/store';
import { defaultLoadingState } from 'shared/lib';
import { toggleAuthModal } from 'pages/user/auth-modal/model';
import { HttpError } from 'shared/api/lib';

const initialState: UserState = {
  data: {
    userId: '',
    name: '',
    email: '',
    token: '',
    refreshToken: '',
  },
  isAuthorized: false,
  startupLoading: { ...defaultLoadingState },
  formLoading: {
    requestState: { ...defaultLoadingState },
    error: null,
  },
}

export const loadUserFromStorage = createAsyncThunk<void, void, AsyncThunkConfig>(
  'user/loadFromStore', 
  async (
    _, { dispatch, getState }
  ) => {
  const userRawData = localStorage.getItem('user');
  handleAuthorizationChange(getState());
  if (userRawData) {
    const userData: UserData = JSON.parse(userRawData);
    if (isUserData(userData)) {
      const { refreshToken, userId } = userData;
      const newTokens = await usersApi.getUserTokens(userId, refreshToken);
      dispatch(authorize({ ...userData, ...newTokens }));
    }
  }
});

type SubmitFormData = usersApi.UserLoginData | usersApi.UserRegistrationData;

export const submitForm = createAsyncThunk<FormLoadingError, SubmitFormData, AsyncThunkConfig>(
  'user/submitForm', 
  async (
    formData,
    { dispatch, getState }
  ) => {
  const { formType } = getState().authModal;
  const error = formType === 'registration' && usersApi.isUserRegistrationData(formData)
    ? await registerUser(dispatch, formData)
    : await loginUser(dispatch, formData);

  if (!error) dispatch(toggleAuthModal(false));
  return error;
});

const loginUser = async (dispatch: AppDispatch, formData: usersApi.UserLoginData) => {
  let error: FormLoadingError = null;
  try {
    const loginResult = await usersApi.loginUser(formData);
    const { email } = formData;
    const { token, refreshToken, userId, name } = loginResult;
    const userData: UserData = { token, refreshToken, userId, name, email };
    dispatch(authorize(userData));
  } catch (err) {
    if (!(err instanceof HttpError)) throw err;
    error = 'Incorrect login or password';
  }
  return error;
}

const registerUser = async (dispatch: AppDispatch, formData: usersApi.UserRegistrationData) => {
  let registerError: FormLoadingError = null;
  try {
    await usersApi.createUser(formData);
    await loginUser(dispatch, formData);
  } catch (err) {
    if (!(err instanceof HttpError)) throw err;
    const { error } = err;
    registerError = typeof error === 'object'
      ? error as usersApi.UserRegistrationError
      : error as string;
  }
  return registerError;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authorize(state, action: PayloadAction<UserData>) {
      state.data = action.payload;
      state.isAuthorized = true;
    },
    deauthorize(state) {
      state.data = initialState.data;
      state.isAuthorized = false;
    },
    resetForm(state) {
      state.formLoading.error = null;
      state.formLoading.requestState = { ...defaultLoadingState };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadUserFromStorage.pending, (state, action) => {
        state.startupLoading.status = 'loading';
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.startupLoading.status = 'succeeded';
      })
      .addCase(loadUserFromStorage.rejected, (state, action) => {
        state.startupLoading.status = 'failed';
        state.startupLoading.error = action.error.message || '';
      })
      .addCase(submitForm.pending, (state, action) => {
        state.formLoading.requestState.status = 'loading';
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.formLoading.requestState.status = 'succeeded';
        state.formLoading.error = action.payload;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.formLoading.requestState.status = 'failed';
        state.formLoading.requestState.error = action.error.message || '';
      })
  }
})

export const { authorize, deauthorize, resetForm } = userSlice.actions;

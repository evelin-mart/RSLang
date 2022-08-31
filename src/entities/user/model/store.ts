import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormLoadingError, isUserData, UserData, UserState } from './interface';
import * as usersApi from 'shared/api/users';
import { AppDispatch, AsyncThunkConfig } from 'app/store';
import { defaultLoadingState } from 'shared/lib';
import { toggleAuthModal } from 'pages/user/auth-modal/model';
import { HttpError } from 'shared/api/lib';
import { isUserRegistrationResult, UserRegistrationResult, UserTokens } from 'shared/api/users';
import { STATUS } from 'shared/constants';

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
  isHeaderMenuOpened: false,
}

export const loadUserFromStorage = createAsyncThunk<void, void, AsyncThunkConfig>(
  'user/loadFromStorage', 
  async (
    _, { dispatch }
  ) => {
  try {    
    const userRawData = localStorage.getItem('user');
    if (userRawData) {
      const userData: UserData = JSON.parse(userRawData);
      if (isUserData(userData)) {
        const { refreshToken, userId } = userData;
        const newTokens = await usersApi.getUserTokens(userId, refreshToken);
        dispatch(authorize({ ...userData, ...newTokens }));        
      }
    }
  } catch (error) {
    dispatch(deauthorize());
  }
});

type SubmitFormData = usersApi.UserLoginData | usersApi.UserRegistrationData;

export const submitForm = createAsyncThunk<FormLoadingError | UserRegistrationResult, SubmitFormData, AsyncThunkConfig>(
  'user/submitForm', 
  async (
    formData,
    { dispatch, getState }
  ) => {
  const { formType, show } = getState().authModal;
  let submitFormError: FormLoadingError = null;
  try {
    if (!show) {
      return await updateUser(formData)
    } else if (formType === 'registration' && usersApi.isUserRegistrationData(formData)) {
      await registerUser(dispatch, formData)
    } else {
      await loginUser(dispatch, formData);
    }
  } catch (err) {
    if (!(err instanceof HttpError)) throw err;
    if (formType === 'login') return 'Incorrect login or password';
    const { error } = err;
    submitFormError = typeof error === 'object'
      ? error as usersApi.UserRegistrationError
      : error as string;
  }
  
  if (show && !submitFormError) {
    dispatch(toggleAuthModal(false));
    dispatch(toggleHeaderMenu(false));
  }

  return submitFormError;
});

const loginUser = async (dispatch: AppDispatch, formData: usersApi.UserLoginData) => {
  const loginResult = await usersApi.loginUser(formData);
  const { email } = formData;
  const { token, refreshToken, userId, name } = loginResult;
  const userData: UserData = { token, refreshToken, userId, name, email };
  dispatch(authorize(userData));
}

const registerUser = async (dispatch: AppDispatch, formData: usersApi.UserRegistrationData) => {
  await usersApi.createUser(formData);
  await loginUser(dispatch, formData);
}

const updateUser = async (formData: Partial<usersApi.UserRegistrationData>) => {
  const keys = Object.keys(formData) as (keyof usersApi.UserRegistrationData)[];
  const dataToUpdate = keys.reduce((acc, key) => {
    return formData[key] !== ''
      ? { ...acc, [key]: formData[key] }
      : acc;
  }, {});
  return await usersApi.updateUser(dataToUpdate);
}

export const getUser = createAsyncThunk<UserData, void, AsyncThunkConfig>('user/get', async () => {
  const newUserData = await usersApi.getUser();
  return newUserData;
});

export const deleteUser = createAsyncThunk<void, void, AsyncThunkConfig>(
  'user/delete', async (_, { dispatch }) => {
  await usersApi.deleteUser();
  dispatch(deauthorize());
});

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
    },
    updateTokens(state, action: PayloadAction<UserTokens>) {
      const { token, refreshToken } = action.payload;
      state.data.token = token;
      state.data.refreshToken = refreshToken;
    },
    toggleHeaderMenu(state, action: PayloadAction<boolean>) {
      state.isHeaderMenuOpened = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadUserFromStorage.pending, (state, action) => {
        state.startupLoading.status = STATUS.LOADING;
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.startupLoading.status = STATUS.SUCCESS;
      })
      .addCase(loadUserFromStorage.rejected, (state, action) => {
        state.startupLoading.status = STATUS.FAIL;
        state.startupLoading.error = action.error.message || '';
      })
      .addCase(submitForm.pending, (state, action) => {
        state.formLoading.requestState.status = STATUS.LOADING;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.formLoading.requestState.status = STATUS.SUCCESS;
        if (!isUserRegistrationResult(action.payload)) {
          state.formLoading.error = action.payload;
        } else {
          state.formLoading.error = null;
          state.data = { ...state.data, ...action.payload };
        }
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.formLoading.requestState.status = STATUS.FAIL;
        state.formLoading.requestState.error = action.error.message || '';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.formLoading.requestState.status = STATUS.SUCCESS;
      })
  }
})

export const {
  authorize,
  deauthorize,
  resetForm,
  updateTokens,
  toggleHeaderMenu,
} = userSlice.actions;

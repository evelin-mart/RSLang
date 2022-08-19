import { createSlice, createAsyncThunk, ThunkDispatch, AnyAction } from '@reduxjs/toolkit'
import { authorizeUser } from 'entities/user';
import { toggleAuthModal } from 'pages/auth/modal/model';
import { UserData } from 'entities/user';
import * as usersApi from 'shared/api/users';
import { HttpError } from 'shared/api/lib';
import { AppDispatch } from 'app/store';

const defaultResult: usersApi.UserLoginResult = {
  token: '',
  refreshToken: '',
  message: '',
  userId: '',
  name: '',
  error: null,
}

export const handleSuccessfullLogin = (dispatch: AppDispatch, userData: UserData) => {
  dispatch(authorizeUser(userData));
  dispatch(toggleAuthModal(false));
}

export const submitLoginForm = createAsyncThunk(
  'loginForm/submit', 
  async (
    formData: usersApi.UserLoginData,
    { dispatch }
  ) => {

  let result = { ...defaultResult };
  try {
    const loginResult = await usersApi.loginUser(formData);
    result = { ...result, ...loginResult };
    const { email } = formData;
    const { token, refreshToken, userId, name } = result;
    const userData: UserData = { token, refreshToken, userId, name, email };
    handleSuccessfullLogin(dispatch as AppDispatch, userData);
  } catch (err) {
    if (!(err instanceof HttpError)) throw err;
    result.error = 'Incorrect login or password';
  }
  
  return result;
});

export interface LoginFormState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  submitResult: usersApi.UserLoginResult;
}

const initialState: LoginFormState = {
  status: 'idle',
  error: null,
  submitResult: { ...defaultResult },
}

export const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    resetLoginForm(state) {
      state.status = 'idle';
      state.error = null;
      state.submitResult = defaultResult;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(submitLoginForm.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(submitLoginForm.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.submitResult = action.payload;
      })
      .addCase(submitLoginForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      })
  }
})

export const { resetLoginForm } = loginFormSlice.actions;

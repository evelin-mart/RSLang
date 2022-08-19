import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UserData } from 'entities/user';
import * as usersApi from 'shared/api/users';
import { HttpError } from 'shared/api/lib';
import { handleSuccessfullLogin } from 'features/user/login';
import { AppDispatch } from 'app/store';

const defaultResult: usersApi.UserRegistrationResult = {
  id: '',
  email: '',
  name: '',
  error: null,
}

export const submitRegistrationForm = createAsyncThunk(
  'registrationForm/submit', 
  async (
    formData: usersApi.UserRegistrationData,
    { dispatch }
  ) => {

  let result = { ...defaultResult };
  try {
    const registrationResult = await usersApi.createUser(formData);

    result = { ...result, ...registrationResult };
    const { name, email, password } = formData;
    const signinResult = await usersApi.loginUser({ email, password });

    const { token, refreshToken, userId } = signinResult;
    const userData: UserData = { token, refreshToken, userId, name, email };
    handleSuccessfullLogin(dispatch as AppDispatch, userData);

  } catch (err) {
    if (!(err instanceof HttpError)) throw err;
    const { error } = err;
    result.error = typeof error === 'object'
      ? error as usersApi.UserRegistrationError
      : error as string;
  }

  return result;
});

export interface RegistrationFormState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  submitResult: usersApi.UserRegistrationResult;
}

const initialState: RegistrationFormState = {
  status: 'idle',
  error: null,
  submitResult: { ...defaultResult },
}

export const registrationFormSlice = createSlice({
  name: 'registrationForm',
  initialState,
  reducers: {
    resetRegistrationForm(state) {
      state.status = 'idle';
      state.error = null;
      state.submitResult = defaultResult;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(submitRegistrationForm.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(submitRegistrationForm.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.submitResult = action.payload;
      })
      .addCase(submitRegistrationForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      })
  }
})

export const { resetRegistrationForm } = registrationFormSlice.actions;
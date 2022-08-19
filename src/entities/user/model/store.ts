import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isUserData, UserData, UserState } from './interface';
import * as usersApi from 'shared/api/users';
import { handleAuthorizationChange } from '../lib';
import { RootState, AppDispatch, AsyncThunkConfig } from 'app/store';

const initialState: UserState = {
  data: {
    userId: '',
    name: '',
    email: '',
    token: '',
    refreshToken: '',
  },
  isAuthorized: false,
  status: 'idle',
  error: null,
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
      dispatch(authorizeUser({ ...userData, ...newTokens }));
    }
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authorizeUser(state, action: PayloadAction<UserData>) {
      state.data = action.payload;
      state.isAuthorized = true;
    },
    deauthorizeUser(state) {
      state.data = initialState.data;
      state.isAuthorized = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadUserFromStorage.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(loadUserFromStorage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      })
  }
})

export const { authorizeUser, deauthorizeUser } = userSlice.actions;

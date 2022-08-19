import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData, UserState } from './interface';

const initialState: UserState = {
  data: {
    userId: '',
    name: '',
    email: '',
    token: '',
    refreshToken: '',
  },
  isAuthorized: false,
}

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
})

export const { authorizeUser, deauthorizeUser } = userSlice.actions;

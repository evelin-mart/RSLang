import { configureStore } from '@reduxjs/toolkit';
import { wordsSlice } from 'entities/word';
import { authModalSlice } from 'pages/user/auth-modal/model';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { userSlice, loadUserFromStorage } from 'entities/user';
import { handleAuthorizationChange } from 'entities/user';

export const store = configureStore({
  reducer: {
    [wordsSlice.name]: wordsSlice.reducer,
    [authModalSlice.name]: authModalSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  }
});

store.dispatch(loadUserFromStorage());

store.subscribe(() => {
  const state = store.getState();
  handleAuthorizationChange(state);
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;

export interface AsyncThunkConfig {
  dispatch: AppDispatch,
  state: RootState,
}

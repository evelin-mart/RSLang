import { configureStore } from '@reduxjs/toolkit';
import { wordsSlice } from 'entities/word';
import { authModalSlice } from 'pages/user/auth-modal/model';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { userSlice, loadUserFromStorage, saveDataToStoreMiddleware } from 'entities/user';
import { handleAuthorizationChange } from 'entities/user';
import { saveTokensMiddleware } from 'shared/api/lib';

export const store = configureStore({
  reducer: {
    [wordsSlice.name]: wordsSlice.reducer,
    [authModalSlice.name]: authModalSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      saveTokensMiddleware, 
      saveDataToStoreMiddleware
    )
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

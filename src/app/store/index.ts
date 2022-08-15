import { configureStore } from '@reduxjs/toolkit';
import { wordsSlice } from 'entities/word/model';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    words: wordsSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;

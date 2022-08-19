import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../constants';
import { Word } from './interface';

export const fetchWords = createAsyncThunk('words/fetchWords', async () => {
  const res = await fetch(`${baseUrl}words?group=0&page=0`);
  return (await res.json()) as Word[];
});

interface WordsState {
  value: Word[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WordsState = {
  value: [],
  status: 'idle',
  error: null,
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWords.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, STATUS } from '../../../shared/constants';
import { Word } from './interface';

export const fetchWords = createAsyncThunk('words/fetchWords', async () => {
  const res = await fetch(`${baseUrl}/words?group=0&page=0`);
  return (await res.json()) as Word[];
});

interface WordsState {
  value: Word[];
  status: STATUS;
  error: string | null;
}

const initialState: WordsState = {
  value: [],
  status: STATUS.IDLE,
  error: null,
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWords.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.value = action.payload;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message || '';
      });
  },
});

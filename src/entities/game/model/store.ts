import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState, GAME_PHASE, GameSource } from './interface';
import { GAME, MAX_PAGE, STATUS } from 'shared/constants';
import { AggregatedWord } from 'shared/api/users-aggregated-words';
import { AsyncThunkConfig } from 'app/store';
import * as agWordsApi from 'shared/api/users-aggregated-words';
import * as wordsApi from 'shared/api/words';
import { getRandomInt } from 'shared/lib';

// 1. 'textbook': use words from current textbook page
//    - if (isAuthorized): use filtred by !userWords.optional.isLearned
//    - else: use all words
// 2. 'headerMenu': fetch from DB, based on group 
//    - if (isAuthorized): using aggregatedWords api
//    - else: using words api
export const loadGameWords = createAsyncThunk<AggregatedWord[] | void, void, AsyncThunkConfig>(
  'game/loadWords', 
  async (
    _, { dispatch, getState }
  ) => {
  const {
    textbook: { words: textbookWords, group: textbookGroup },
    game: { source, group },
    user,
  } = getState();
  let words: AggregatedWord[];

  if (source === 'headerMenu') {
    const options = { group, page: getRandomInt(0, MAX_PAGE) };
    words = await (
      user.isAuthorized
        ? agWordsApi.getAggregatedWords(options)
        : wordsApi.getWords(options)
    );
  } else {
    dispatch(setGameGroup(textbookGroup))
    words = user.isAuthorized
      ? textbookWords.filter((word) => !word.userWord?.optional.isLearned)
      : textbookWords;
    console.log('Game words:', words)
  }
  if (words.length === 0) throw new Error('There are no words to use in game');
  dispatch(setWords(words));
});

// export const saveResults = createAsyncThunk<AggregatedWord[] | void, void, AsyncThunkConfig>(
//   'game/saveResults', 
//   async (
//     _, { dispatch, getState }
//   ) => {
// });

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameId(state, action: PayloadAction<GAME>) {
      state.gameId = action.payload;
    },
    setGamePhase(state, action: PayloadAction<GAME_PHASE>) {
      state.gamePhase = action.payload;
    },
    setGameSource(state, action: PayloadAction<GameSource>) {
      state.source = action.payload;
    },
    toggleGameSound(state) {
      state.isSound = !state.isSound;
    },
    toggleGameFullscreen(state) {
      state.isFullscreen = !state.isFullscreen;
    },
    setWords(state, action: PayloadAction<AggregatedWord[]>) {
      state.words = action.payload;
    },
    setGameGroup(state, action: PayloadAction<number>) {
      state.group = action.payload;
    },
    addWordResult(state, action: PayloadAction<{ id: string, result: boolean }>) {
      const { id, result } = action.payload;
      state.results = { ...state.results, [id]: result };
    },
    resetGame(state) {
      state.loadingProcess.status = STATUS.IDLE;
      state.gamePhase = GAME_PHASE.START;
      state.results = {};
      state.words = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadGameWords.pending, (state) => {
        state.loadingProcess.status = STATUS.LOADING;
      })
      .addCase(loadGameWords.fulfilled, (state, action) => {
        // const { gamePhase } = state;
        // state.words = action.payload;
        state.loadingProcess.status = STATUS.SUCCESS;
        // state.gamePhase = gamePhase === GAME_PHASE.START
        //   ? GAME_PHASE.PLAYING
        //   : GAME_PHASE.RESULTS;
      })
      .addCase(loadGameWords.rejected, (state, action) => {
        state.loadingProcess.status = STATUS.FAIL;
        state.loadingProcess.error = action.error.message || '';
      })
    }
})

export const {
  setGameId,
  setWords,
  setGameGroup,
  setGamePhase,
  setGameSource,
  addWordResult,
  resetGame,
  toggleGameSound,
  toggleGameFullscreen,
} = gameSlice.actions;

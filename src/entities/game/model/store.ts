import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameState, GAME_PHASE } from './interface';
import * as usersApi from 'shared/api/users';
import { AppDispatch, AsyncThunkConfig } from 'app/store';
import { defaultLoadingState } from 'shared/lib';
import { toggleAuthModal } from 'pages/user/auth-modal/model';
import { HttpError } from 'shared/api/lib';
import { isUserRegistrationResult, UserRegistrationResult, UserTokens } from 'shared/api/users';
import { GAME, STATUS } from 'shared/constants';
import { AggregatedWord } from 'shared/api/users-aggregated-words';
import { Word } from 'entities/word';

const initialState: GameState = {
  gameId: null,
  gamePhase: GAME_PHASE.START,
  words: [],
  sound: true,
  fullscreen: false,
  source: 'headerMenu',
  results: {},
}

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
    setGameSource(state, action: PayloadAction<'headerMenu' | 'textbook'>) {
      state.source = action.payload;
    },
    setWords(state, action: PayloadAction<Word[] | AggregatedWord[]>) {
      state.words = action.payload;
    },
    addWordResult(state, action: PayloadAction<{ id: string, result: boolean }>) {
      const { id, result } = action.payload;
      state.results = { ...state.results, [id]: result };
    },
    resetGame(state, action: PayloadAction<void>) {
      return initialState;
    }
  },
})

export const {
  setGameId,
  setWords,
  setGamePhase,
  setGameSource,
  addWordResult,
  resetGame,
} = gameSlice.actions;

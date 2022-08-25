import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameState, GAME_PHASE } from './interface';
import { GAME } from 'shared/constants';
import { AggregatedWord } from 'shared/api/users-aggregated-words';
import { Word } from 'entities/word';

const initialState: GameState = {
  gameId: null,
  gamePhase: GAME_PHASE.START,
  words: [],
  isSound: true,
  isFullscreen: false,
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
    toggleGameSound(state) {
      state.isSound = !state.isSound;
    },
    toggleGameFullscreen(state) {
      state.isFullscreen = !state.isFullscreen;
    },
    setWords(state, action: PayloadAction<Word[] | AggregatedWord[]>) {
      state.words = action.payload;
    },
    addWordResult(state, action: PayloadAction<{ id: string, result: boolean }>) {
      const { id, result } = action.payload;
      state.results = { ...state.results, [id]: result };
    },
    resetGame() {
      return initialState;
    },
    replayGame(state) {
      state.gamePhase = GAME_PHASE.START;
      state.results = {};
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
  replayGame,
  toggleGameSound,
  toggleGameFullscreen,
} = gameSlice.actions;

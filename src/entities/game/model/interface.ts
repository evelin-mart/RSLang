import { GAME } from "shared/constants";
import { AggregatedWord } from 'shared/api/users-aggregated-words';
import { LoadingState, defaultLoadingState } from 'shared/lib/store';

export enum GAME_PHASE {
  START = 'start',
  COUNTDOWN = 'countdown',
  PLAYING = 'playing',
  RESULTS = 'results',
}

export type GameSource = 'headerMenu' | 'textbook';

export interface GameState {
  gameId: GAME | null;
  gamePhase: GAME_PHASE;
  group: number;
  words: AggregatedWord[];
  isSound: boolean;
  isFullscreen: boolean;
  source: GameSource;
  results: Record<string, boolean>;
  loadingProcess: LoadingState;
}

export const initialState: GameState = {
  gameId: null,
  gamePhase: GAME_PHASE.START,
  group: 0,
  words: [],
  isSound: true,
  isFullscreen: false,
  source: 'headerMenu',
  results: {},
  loadingProcess: defaultLoadingState,
}

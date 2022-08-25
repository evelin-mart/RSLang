import { GAME } from "shared/constants";
import { AggregatedWord } from 'shared/api/users-aggregated-words';

export enum GAME_PHASE {
  START = 'start',
  PLAYING = 'playing',
  RESULTS = 'results',
  LOADING = 'loading',
}

export interface GameState {
  gameId: GAME | null;
  gamePhase: GAME_PHASE;
  words: AggregatedWord[];
  sound: boolean;
  fullscreen: boolean;
  source: 'headerMenu' | 'textbook';
  results: Record<string, boolean>;
}
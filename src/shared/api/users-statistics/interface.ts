import { GAME } from 'shared/constants';

type GameStatistics = {
  new: number;
  progress: number;
  chain: number;
}

export const defaultGameStatistics = {
  new: 0,
  progress: 0,
  chain: 0,
}

export interface UserStatistics {
  learnedWords: number,
  optional: Record<GAME, GameStatistics>
}

export const defaultUserStatistics: UserStatistics = {
  learnedWords: 0,
  optional: {
    [GAME.AUDIO]: defaultGameStatistics,
    [GAME.SPRINT]: defaultGameStatistics,
  }
}
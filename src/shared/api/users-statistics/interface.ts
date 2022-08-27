import { GAME } from 'shared/constants';
import { dateToJson } from 'shared/lib';

// type GameStatistics = {
//   new: number;
//   progress: number;
//   chain: number;
// }

// export const defaultGameStatistics = {
//   new: 0,
//   progress: 0,
//   chain: 0,
// }

// export interface UserStatistics {
//   learnedWords: number,
//   optional: Record<GAME, GameStatistics>
// }

// export const defaultUserStatistics: UserStatistics = {
//   learnedWords: 0,
//   optional: {
//     [GAME.AUDIO]: defaultGameStatistics,
//     [GAME.SPRINT]: defaultGameStatistics,
//   }
// }

//                    [new,  progress, chain ]
type GameStatistics = [number, number, number];

export const defaultGameStatistics = [0, 0, 0];

export interface UserStatistics {
  learnedWords: number,
  optional: {
    [x: string]: {
      a: GameStatistics,
      s: GameStatistics,
      w: number,
    }
  }
}

export const defaultUserStatistics: UserStatistics = {
  learnedWords: 0,
  optional: {
    [dateToJson(new Date(0))]: {
      a: [0, 0, 0],
      s: [0, 0, 0],
      w: 0,
    }
  }
}

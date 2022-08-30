import { GAME } from 'shared/constants';
import { games } from 'shared/constants/games';

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

//                           [new,  progress, chain ]
export type GameStatistics = [number, number, number];

export const defaultGameStatistics = [0, 0, 0];

export const gameStatsKeys = Object.keys(games).map((game) => {
 return games[game as GAME].statsKey;
});

export type GameStatsKey = typeof gameStatsKeys[number];

export type UserDailyStats = {
  [x: GameStatsKey | 'lw']: GameStatistics | number,
}

export interface UserStatistics {
  learnedWords?: number,
  optional: {
    [x: string]: UserDailyStats
  }
}

export interface UserStatisticsResponse extends UserStatistics{
  id?: string,
}

export const defaultUserDailyStats: UserDailyStats = {
  a: [0, 100, 0],
  s: [0, 100, 0],
  lw: 0,
}
export const defaultUserStatistics: UserStatistics = {
  // learnedWords: 0,
  optional: {}
}

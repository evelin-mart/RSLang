import {
  UserDailyStats,
  gameStatsKeys,
  GameStatistics
} from 'shared/api/users-statistics';
import { GAME } from 'shared/constants';
import { games } from 'shared/constants/games';

export const getWordsStats = (stats: UserDailyStats) => {
  const newWords = gameStatsKeys.reduce((acc, key) => {
    return acc + (stats[key] as GameStatistics)[0]
  }, 0);
  const percent = gameStatsKeys.reduce((acc, key) => {
    return acc + (stats[key] as GameStatistics)[1]
  }, 0) / gameStatsKeys.length;
  return [
    { title: 'Новых слов', value: newWords},
    { title: 'Изученных слов', value: +stats.lw},
    { title: 'Правильных ответов', value: `${percent}%`},  
  ];
}

export const getGameStats = (stats: UserDailyStats, gameId: GAME) => {
  const { statsKey } = games[gameId];
  const [newWords, percent, chain] = stats[statsKey] as GameStatistics;
  return [
    { title: 'Новых слов', value: newWords},
    { title: 'Самая длинная серия', value: chain},
    { title: 'Правильных ответов', value: `${newWords === 0 ? 0 : percent}%`}, 
  ]
}
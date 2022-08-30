
import React from 'react';
import { UserStatistics } from "shared/api/users-statistics"
import { Typography, Box } from '@mui/material';
import { GAME } from 'shared/constants';
import { games } from 'shared/constants/games';
import { StatsItem } from '../stats-item';
import { getGameStats, getWordsStats } from 'pages/statistics/model';
import { dateToJson } from 'shared/lib';

type DailyStatsProps = {
  stats: UserStatistics | Error
}

export const DailyStats = ({ stats }: DailyStatsProps) => {
  const date = dateToJson(new Date());

  if (stats instanceof Error || stats.optional[date] === undefined) {
    return <Typography variant="body1" color="info.main">Статистики за сегодня ({date}) пока нет</Typography>;
  }

  return (
    <Box sx={{
      display: "flex",
      mt: 3,
      columnGap: 3,
      rowGap: 3,
      flexWrap: "wrap",
      justifyContent: "center" 
    }}>
      <StatsItem
        key={'words'}
        title={"Слова"}
        rows={getWordsStats(stats.optional[date])} />
      {Object.keys(games).map((gameId) => (
        <StatsItem
          key={gameId}
          title={games[gameId as GAME].title}
          rows={getGameStats(stats.optional[date], gameId as GAME)} />
      ))}
    </Box>
  )
}
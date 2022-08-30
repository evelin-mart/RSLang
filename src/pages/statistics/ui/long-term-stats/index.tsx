
import React from 'react';
import { UserStatistics } from "shared/api/users-statistics"
import { Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { getWordsStats } from 'pages/statistics/model';
import { dateToJson } from 'shared/lib';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

type LongTermStatsProps = {
  stats: UserStatistics | Error
}

export const LongTermStats = ({ stats }: LongTermStatsProps) => {
  const theme = useTheme();
  const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
  const { palette } = theme;

  if (stats instanceof Error) {
    return <Typography variant="body1" color="info.main">Статистики пока нет</Typography>;
  }

  const data = Object.keys(stats.optional).map((date) => {
    const wordsStatsOnDate = getWordsStats(stats.optional[date]);
    return {
      name: date,
      uv: wordsStatsOnDate[0].value,
    }
  });

  return (
    <Box sx={{ flexBasis: 700 }}>
      <ResponsiveContainer minWidth={250} width={"99%"} height={smMatches ? 400 : 300}>
        <ComposedChart data={data} margin={{top: 0, left: 0, right: 0, bottom: 0}} style={{ left: "-20px"}}>
          <CartesianGrid stroke={palette.grey[400]} />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend payload={[{ value: 'Новых слов за день', type: 'line' }]} color={palette.info.dark} />
          <Bar dataKey="uv" name="Новые слова" barSize={20} fill={palette.info.dark} />
          <Line dataKey="uv" type="monotone" name="Новые слова" stroke={palette.warning.main} />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  )
}

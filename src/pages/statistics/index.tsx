import React from 'react';
import { Page } from 'pages/page';
import { CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { PAGES } from 'shared/constants';
import { useStatistics } from './lib';
import { DailyStats } from './ui';

export const StatisticsPage = () => {
  const [ loading, stats ] = useStatistics();

  return (
    <Page pageName={PAGES.STATISTICS}>
      <Grid component="section">
        <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
          Статистика пользователя по словам и мини-играм за сегодня
        </Typography>
        {loading || stats === null 
          ? <CircularProgress color="secondary"/>
          : <DailyStats stats={stats} />}
      </Grid>
      <Grid component="section" sx={{ mt: 3 }}>
        <Typography variant="h5" component="h3">
          Долгосрочная статистика по дням<br />
          график, отображающий количество новых слов за каждый день изучения<br />
          график, отображающий увеличение общего количества изученных слов за весь период обучения по дням
        </Typography>
        {loading 
          ? <CircularProgress color="secondary"/>
          : <Paper sx={{ p: 3 }}>
              {JSON.stringify(stats, null, 2)}
            </Paper>}  
      </Grid>
    </Page>
  )
}

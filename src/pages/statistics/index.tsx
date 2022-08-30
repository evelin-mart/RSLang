import React from 'react';
import { Page } from 'pages/page';
import { CircularProgress, Grid, Box, Typography } from '@mui/material';
import { PAGES } from 'shared/constants';
import { useStatistics } from './lib';
import { DailyStats, LongTermStats } from './ui';
import { StatsSectionWrapper } from './ui/section-wrapper/index';

export const StatisticsPage = () => {
  const [ loading, stats ] = useStatistics();

  return (
    <Page pageName={PAGES.STATISTICS}>
      <StatsSectionWrapper
        loading={loading}
        title={"Статистика пользователя по словам и мини-играм за сегодня"}>
        { stats !== null && <DailyStats stats={stats} /> }
      </StatsSectionWrapper>
      <StatsSectionWrapper
        loading={loading}
        title={"Долгосрочная статистика по дням"}>
        { stats !== null && <LongTermStats stats={stats} /> }
      </StatsSectionWrapper>
    </Page>
  )
}

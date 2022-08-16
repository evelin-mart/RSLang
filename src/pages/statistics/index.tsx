import React from 'react';
import { Page } from 'pages/page';
import { Grid, Typography } from '@mui/material';

export const StatisticsPage = () => {
  return (
    <Page pageClassName="statistics" title="Статистика">
      <Grid container component="section">
        <Typography variant="h5" component="h3">
          Статистика пользователя по словам и мини-играм
        </Typography>
      </Grid>
    </Page>
  )
}

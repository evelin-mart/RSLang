import React from 'react';
import { Page } from 'pages/page';
import { Grid, Typography } from '@mui/material';

export const MainPage = () => {
  return (
    <Page pageClassName="main" title="Главная">
      <Grid container component="section">
        <Typography variant="h5" component="h3">
          Возможности и преимуществ приложения
        </Typography>
      </Grid>
      <Grid container component="section">
        <Typography variant="h5" component="h3">
          О команде
        </Typography>
      </Grid>
    </Page>
  )
}


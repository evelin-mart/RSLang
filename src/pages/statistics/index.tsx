import { Page } from 'pages/page';
import { Grid, Typography } from '@mui/material';
import { PAGES } from '../../shared/constants';

export const StatisticsPage = () => {
  return (
    <Page pageName={PAGES.STATISTICS} title="Статистика">
      <Grid container component="section">
        <Typography variant="h5" component="h3">
          Статистика пользователя по словам и мини-играм
        </Typography>
      </Grid>
    </Page>
  )
}

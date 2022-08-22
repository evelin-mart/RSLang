import { Page } from 'pages/page';
import { Grid, Typography } from '@mui/material';
import { PAGES } from '../../shared/constants';
import { Advantages } from 'widgets/advantages';
import { AboutTeam } from 'widgets/about-team';
import styles from './styles.module.scss';

export const MainPage = () => {
  return (
    <Page pageName={PAGES.MAIN} title="">
      <div className={styles.background}></div>
      <Grid container className={styles.mainPage} component="section">
        <Typography sx={{width: 1, m: '5vh 0', typography: { xs: 'h5', md: 'h3'}}}>
          RSLang - удобное приложение для изучения английского языка!
        </Typography>
        <Advantages/>
      </Grid>
      <Grid className={styles.mainPage} container component="section">
        <AboutTeam/>
      </Grid>
    </Page>
  )
}


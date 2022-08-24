import { Page } from 'pages/page';
import { Grid, Typography, Container, Box } from '@mui/material';
import { Advantages } from 'widgets/advantages';
import { AboutTeam } from 'widgets/about-team';
import styles from './styles.module.scss';
import { PAGES } from 'shared/constants';

export const MainPage = () => {
  return (
    <Page pageName={PAGES.MAIN}>
      <Box sx={{ position: "relative" }}>
        <div className={styles.background}></div>
        <Container maxWidth="lg">
          <Grid>
            <Grid container className={styles.mainPage} component="section">
              <Typography sx={{width: 1, m: '0 0 5vh', typography: { xs: 'h5', md: 'h3'}}}>
                RSLang - удобное приложение для изучения английского языка!
              </Typography>
              <Advantages/>
            </Grid>
            <Grid className={styles.mainPage} container component="section">
              <AboutTeam/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  )
}


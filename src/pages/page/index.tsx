import { Typography, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';
import { ResponsiveAppBar } from 'widgets/header';
import { Footer } from 'widgets/footer';
import { PAGES } from '../../shared/constants';

export type PageProps = {
  pageName: PAGES;
  title: string;
  children?: React.ReactNode;
};

export const Page = (props: PageProps) => {
  const { pageName, title, children } = props;
  const isFooter = pageName !== PAGES.GAME;
  return (
    <>
      <ResponsiveAppBar />
      <main>
        <Container maxWidth="lg">
          <Typography variant='h6' marginTop={1} marginBottom={2}>
            {title}
          </Typography>
          <Grid>
            {children}
          </Grid>
        </Container>
      </main>
      {isFooter && <Footer />}
    </>
  );
};

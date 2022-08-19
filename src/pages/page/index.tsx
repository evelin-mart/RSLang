import { Typography, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';
import { Footer } from 'widgets/footer';
import { ResponsiveAppBar } from 'widgets/header';

export type PageProps = {
  pageClassName: string;
  title: string;
  children?: React.ReactNode;
};

export const Page = (props: PageProps) => {
  const { pageClassName, title, children } = props;
  const isFooter = pageClassName !== 'game';
  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth={'xl'}>
        <main>
          <Typography component="h2" variant="h4" marginTop={2} marginBottom={2}>
            {title}
          </Typography>
          <Grid>
            {children}
          </Grid>
        </main>
      </Container>
      {isFooter && <Footer />}
    </>
  )
}

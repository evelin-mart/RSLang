import { Typography, Grid } from '@mui/material';
import React from 'react';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import { PAGES } from '../../shared/components/constants';

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
      <Header />
      <main>
        <div className='container'>
          <Typography variant='h6' marginTop={1} marginBottom={2}>
            {title}
          </Typography>
          <Grid>{children}</Grid>
        </div>
      </main>
      {isFooter && <Footer />}
    </>
  );
};

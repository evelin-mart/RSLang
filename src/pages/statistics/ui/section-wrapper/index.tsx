import React from 'react';
import { Page } from 'pages/page';
import { CircularProgress, Grid, Box, Typography } from '@mui/material';
import { PAGES } from 'shared/constants';
import { UserStatistics } from 'shared/api/users-statistics';

type StatsSectionWrapperProps = React.PropsWithChildren & {
  title: string;
  loading: boolean;
}

export const StatsSectionWrapper = ({ title, loading, children }: StatsSectionWrapperProps) => {

  return (
    <Grid component="section">
      <Typography variant="h5" component="h3" sx={{ mb: 2, textAlign: "center" }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {loading
          ? <CircularProgress color="secondary"/>
          : children }
      </Box>
    </Grid>
  )
}
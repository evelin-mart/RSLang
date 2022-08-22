import React from 'react';
import './index.scss';
import { withProviders } from './providers';
import { Routing } from 'pages';
import { Grid } from '@mui/material';
import { AuthModal } from 'pages/user/auth-modal';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from 'entities/user';

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <>
      <AuthModal />
      <Grid className="app" sx={{ pl: 2, pr: 2 }}>
        <Routing />
      </Grid>
    </>
  );
}

export default withProviders(<App />);

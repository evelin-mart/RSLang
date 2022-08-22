import './index.scss';
import { withProviders } from './providers';
import { Routing } from 'pages';
import { AuthModal } from 'pages/user/auth-modal';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from 'entities/user';
import React from 'react';

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <>
      <AuthModal />
      <div className="app" >
        <Routing />
      </div>
    </>
  );
}

export default withProviders(<App />);

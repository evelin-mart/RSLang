import './index.scss';
import React from 'react';
import { withProviders } from './providers';
import { Routing } from 'pages';
import { AuthModal } from 'pages/user/auth-modal';
import { useScrollbarWidth } from 'shared/lib';
import { useUser } from '../entities/user/model/hooks';
import { useAppSelector } from './store';

const App = () => {
  const { isHeaderMenuOpened } = useUser();
  const { hasScrollBar } = useScrollbarWidth();
  const { show: isAuthModalShowed } = useAppSelector((state) => state.authModal);

  return (
    <>
      <AuthModal />
      <div className="app" style={{
        paddingTop: (isHeaderMenuOpened && hasScrollBar) || isAuthModalShowed
          ? "var(--header-height)"
          : 0,
      }}>
        <Routing />
      </div>
    </>
  );
}

export default withProviders(<App />);

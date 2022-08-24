import './index.scss';
import React from 'react';
import { withProviders } from './providers';
import { Routing } from 'pages';
import { AuthModal } from 'pages/user/auth-modal';
import { useNoScrollFit } from 'shared/lib';

const App = () => {
  const { isNoScrollFit } = useNoScrollFit();

  return (
    <>
      <AuthModal />
      <div className="app" style={{
        paddingTop: isNoScrollFit
          ? "var(--header-height)"
          : 0,
      }}>
        <Routing />
      </div>
    </>
  );
}

export default withProviders(<App />);

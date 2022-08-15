import React from 'react';
import './styles.scss';
import { HeaderMenu } from 'widgets/header-menu';
import { UserToolbar } from 'widgets/user-toolbar';
import { AppLogo } from 'widgets/app-logo';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__container container">
        <AppLogo />
        <HeaderMenu />
        <UserToolbar />
      </div>
    </header>
  )
}
import React from 'react';
import styles from './styles.module.scss';
import { HeaderMenu } from 'widgets/header-menu';
import { UserToolbar } from 'widgets/user-toolbar';
import { AppLogo } from 'shared/components/app-logo';
import { Box } from '@mui/material';

export const Header = () => {
  return (
    <Box component="header" className={styles.header}>
      <AppLogo />
      <HeaderMenu />
      <UserToolbar />
    </Box>
  )
}
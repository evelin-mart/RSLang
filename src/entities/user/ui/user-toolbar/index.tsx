import React from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Login as LoginIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { toggleAuthModal } from 'pages/user/auth-modal/model';
import { useUser, resetForm } from 'entities/user';
import { deauthorize } from 'entities/user';
import { Link } from 'react-router-dom';

export const UserToolbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useUser();
  const { palette } = useTheme();

  const handleLogout = () => {
    dispatch(deauthorize());
  }

  const handleOpenModal = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(resetForm());
    dispatch(toggleAuthModal(true));
  };

  return (
    <Box sx={{ color: "primary.contrastText" }}>
      {!user.isAuthorized
        ? <IconButton
            onClick={handleOpenModal}
            color="primary"
            aria-label="Войти"
            sx={{ color: "primary.contrastText" }}>
            <LoginIcon />
          </IconButton>
        : <>
            <Link to="/profile" style={{ color: palette.primary.contrastText }}>
              {user.data.email}
            </Link>
            <IconButton
              onClick={handleLogout}
              color="primary"
              aria-label="Выйти"
              sx={{ color: "primary.contrastText" }}>
              <LogoutIcon />
            </IconButton>
          </>}
    </Box>
  );
}

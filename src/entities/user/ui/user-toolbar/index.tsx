import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Login as LoginIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { toggleAuthModal } from 'pages/user/auth-modal/model';
import { useUser } from 'entities/user';
import { deauthorize } from 'entities/user';

export const UserToolbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useUser();

  const handleLogout = () => {
    dispatch(deauthorize());
  }

  const handleOpenModal = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(toggleAuthModal(true));
  };

  return (
    <Box>
      {!user.isAuthorized
        ? <IconButton onClick={handleOpenModal} color="primary" aria-label="Войти">
            <LoginIcon />
          </IconButton>
        : <>
            <Typography component="span" color="info.dark" variant="body2">
              {user.data.email}
            </Typography>
            <IconButton onClick={handleLogout} color="primary" aria-label="Выйти">
              <LogoutIcon />
            </IconButton>
          </>}
    </Box>
  );
}

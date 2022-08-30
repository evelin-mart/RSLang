import React from 'react';
import { 
  Avatar, Box, IconButton,
  ListItemIcon, Menu, MenuItem,
  Tooltip, Typography } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { deauthorize, UserState, toggleHeaderMenu } from 'entities/user';
import { useNavigate } from 'react-router-dom';
import { userMenuOptions } from './model';

export const PopupMenu = (props: { user: UserState}) => {
  const { user } = props;
  const dispatch: AppDispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(toggleHeaderMenu(true));
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = (path?: string) => {
    dispatch(toggleHeaderMenu(false));
    setAnchorElUser(null);
    if (path !== undefined && typeof path === 'string') {
      navigate(path, { replace: true });
    }
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(deauthorize());
  }

  const userMenuItems = user.isAuthorized
    ? Object.keys(userMenuOptions).map((key) => {
      const { title, href, icon } = userMenuOptions[key];
      return (
        <MenuItem key={key} onClick={() => handleCloseUserMenu(href)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <Typography variant="inherit">
            {title}
          </Typography>
        </MenuItem>)
    })
    : '';

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Меню пользователя">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.data.name} src="#" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px', width: 200 }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={() => handleCloseUserMenu()}
        keepMounted
      > 
        <MenuItem divider={true} disabled sx={{
          justifyContent: "flex-end",
          mb: 1,
          color: "primary.main",
          "&.Mui-disabled": {
            opacity: 1,
          }}}>
          <Typography variant="body1" noWrap>
            {user.data.name}
          </Typography>
        </MenuItem>
        {userMenuItems}
        <MenuItem
          onClick={handleLogout}
          aria-label="Выйти"
          sx={{ color: "primary" }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Выход</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

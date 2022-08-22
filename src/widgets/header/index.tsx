import styles from './styles.module.scss';
import { HeaderMenu } from 'widgets/header-menu';
import { UserToolbar } from 'widgets/user-toolbar';
import { AppLogo } from 'shared/components/app-logo';
import { Box } from '@mui/material';
import classNames from 'classnames';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { AppLogo } from 'shared/components/app-logo';
import { HeaderMenu } from 'widgets/header-menu';
import { Drawer } from '@mui/material';
import styles from './styles.module.scss';

export const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box component='header' className={styles.header}>
      <div className={classNames('container', styles.wrapper)}>
        <AppBar position="static" color='secondary'>
        <Toolbar disableGutters sx={{height: 1}}>
          <AppLogo isMobile={false}/>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Drawer 
              anchor='left' 
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              keepMounted
              sx={{
                display: { xs: 'flex', md: 'none' },
                bgcolor: 'primary'
              }}
            >
              <div style={{height: '100%', display: 'flex', alignItems: 'center', padding: '20px'}}>
                <HeaderMenu isColumn={true}/>
              </div>
            </Drawer>
          </Box>
          <AppLogo isMobile={true}/>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <HeaderMenu isColumn={false}/>
          </Box>
          <div style={{color: 'red', fontSize: '12px', width: '50px'}}>Auth placeholder</div>
        </Toolbar>
    </AppBar>
      </div>
    </Box>
  );
};

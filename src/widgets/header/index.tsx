import * as React from 'react';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppLogo } from 'shared/components/app-logo';
import { HeaderMenu } from 'widgets/header-menu';
import { Drawer } from '@mui/material';
import styles from './styles.module.scss';

export const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static' className={styles.header}>
      <div className='container'>
        <Toolbar disableGutters sx={{ height: 1 }}>
          <AppLogo isMobile={false} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='primary'>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor='left'
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              keepMounted
              sx={{
                display: { xs: 'flex', md: 'none' },
                bgcolor: 'primary',
              }}>
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px',
                }}>
                <HeaderMenu isColumn={true} />
              </div>
            </Drawer>
          </Box>
          <AppLogo isMobile={true} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <HeaderMenu isColumn={false} />
          </Box>
          <div style={{ color: 'red', fontSize: '12px', width: '50px' }}>Auth placeholder</div>
        </Toolbar>
      </div>
    </AppBar>
  );
};

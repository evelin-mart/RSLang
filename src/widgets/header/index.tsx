import { HeaderMenu } from 'widgets/header-menu';
import { UserToolbar, useUser, toggleHeaderMenu } from 'entities/user';
import { AppLogo } from 'shared/components/app-logo';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Box, Drawer } from '@mui/material';
import styles from './styles';
import { useScrollbarWidth } from 'shared/lib';
import { AppDispatch, useAppSelector } from 'app/store';
import { useDispatch } from 'react-redux';

export const ResponsiveAppBar = () => {
  const { show: isAuthModalShowed } = useAppSelector((state) => state.authModal);
  const { hasScrollBar, scrollbarWidth } = useScrollbarWidth();
  const dispatch: AppDispatch = useDispatch();
  const { isHeaderMenuOpened } = useUser();
  const [ anchorElNav, setAnchorElNav ] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(toggleHeaderMenu(true));
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    dispatch(toggleHeaderMenu(false));
    setAnchorElNav(null);
  };

  const menuOpened = {
    position: "fixed",
    top: 0,
    pr: `${scrollbarWidth}px`,
  }

  return (
    <AppBar
      position="static"
      color="primary"
      sx={[
        { height: "var(--header-height)",  },
        ((isHeaderMenuOpened && hasScrollBar) || isAuthModalShowed) && menuOpened,
      ]}>
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Toolbar disableGutters sx={{height: 1, width: "100%"}}>
          <AppLogo isMobile={false}/>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              sx={{ color: "primary.contrastText" }}
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
              <Box sx={styles.headerMenuBoxColumn}>
                <HeaderMenu isColumn={true}/>
              </Box>
            </Drawer>
          </Box>
          <AppLogo isMobile={true}/>
          <Box sx={styles.headerMenuBox}>
            <HeaderMenu isColumn={false}/>
          </Box>
          <UserToolbar />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

import { HeaderMenu } from 'widgets/header-menu';
import { UserToolbar } from 'entities/user';
import { AppLogo } from 'shared/components/app-logo';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Box, Drawer } from '@mui/material';
import styles from './styles';

export const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="primary" sx={{ height: "var(--header-height)" }}>
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

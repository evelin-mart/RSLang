import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { matchPath } from 'react-router';
import { Box, MenuItem, Menu, Link } from '@mui/material';
import { MenuLink } from 'shared/constants/menu-links';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { toggleHeaderMenu } from 'entities/user';
import { setGameSource } from 'entities/game';
import { MenuLinkText } from '../link-text';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from '../styles';

type HeaderSubmenuProps = {
  isColumn: boolean;
  link: MenuLink;
}

export const HeaderSubmenu = (props: HeaderSubmenuProps) => {
  const { isColumn, link } = props;
  const dispatch: AppDispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(toggleHeaderMenu(true));
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = (path?: string) => {
    dispatch(setGameSource('headerMenu'));
    dispatch(toggleHeaderMenu(false));
    setAnchorElUser(null);
    if (path !== undefined && typeof path === 'string') {
      navigate(path, { replace: true });
    }
  };

  const userMenuItems = link.submenu?.map(({ title, href }, i) => {
    const isActive = matchPath(href, location.pathname) !== null;
    return (
      <MenuItem
        key={i}
        onClick={() => handleCloseUserMenu(href)}
        sx={{ color: "primary.main" }}>
        <MenuLinkText title={title} isActive={isActive} isColumn={isColumn}/>
      </MenuItem>)
  })

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Link onClick={handleOpenUserMenu} sx={[{ display: "flex" }, styles.headerSubmenuMainLink]}>
        <MenuLinkText title={link.title} isActive={false} isColumn={isColumn}/>
        <ArrowDropDownIcon />
      </Link>
      <Menu
        disableAutoFocusItem={true}
        sx={{ mt: '35px', width: 200 }}
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
        {userMenuItems}
      </Menu>
    </Box>
  );
}
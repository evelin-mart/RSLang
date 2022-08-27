import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { matchPath } from 'react-router';
import { Box, List, ListItem, useTheme } from '@mui/material';
import { links } from 'shared/constants/menu-links';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import styles from './styles';
import { toggleHeaderMenu } from 'entities/user';
import { setGameGroup, setGameSource } from 'entities/game';
import { HeaderSubmenu } from './submenu';
import { MenuLinkText } from './link-text';

export const HeaderMenu = (props: {isColumn: boolean}) => {
  const dispatch: AppDispatch = useDispatch();
  const { isColumn } = props;
  const { palette } = useTheme();
  const location = useLocation();

  React.useEffect(() => {
    dispatch(toggleHeaderMenu(false));
  }, [location, dispatch]);

  const handleGameClick = () => {
    dispatch(setGameGroup(0));
    dispatch(setGameSource('headerMenu'));
  }

  const linksRendered = links.map((link, i) => {
    const { title, href, submenu } = link;
    const isActive = matchPath(href, location.pathname) !== null;
    const isGameLink = href.includes('game');
    return (
      <ListItem key={i} sx={{ p: 1 }}>
        {submenu !== undefined
          ? <HeaderSubmenu isColumn={isColumn} link={link}/>
          : <Link
            style={{
              color: palette.primary.contrastText,
              pointerEvents: isActive ? "none" : "all",
              cursor: isActive ? "default" : "pointer",
            }}
            to={href}
            onClick={() => isGameLink && handleGameClick()}>
            <MenuLinkText title={title} isActive={isActive} isColumn={isColumn}/>
          </Link>}
      </ListItem>
    )
  });

  return (
    <Box component="nav">
      <List sx={[
        styles.headerMenu,
        isColumn && styles.headerMenu_column
      ]}>
        {linksRendered}
      </List>
    </Box>
  )
}
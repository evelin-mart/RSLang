import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { matchPath } from 'react-router';
import { Box, List, ListItem, Typography, useTheme } from '@mui/material';
import { links } from 'shared/constants/menu-links';
import styles from './styles';

export const HeaderMenu = (props: {isColumn: boolean}) => {
  const { isColumn } = props;
  const { palette } = useTheme();
  const location = useLocation();

  const linksRendered = links.map(({ title, href }, i) => {
    const isActive = matchPath(href, location.pathname) !== null;
    return (
      <ListItem key={i}>
        <Link 
          style={{
            color: palette.primary.contrastText
          }}
          to={href}
        >
          <Typography
            component="span"
            variant={isColumn ? "h5" : "subtitle1"}
            sx={[
              styles.headerMenuLink,
              isActive && styles.headerMenuLink_active
            ]}
          >
            {title}
          </Typography>
        </Link>
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
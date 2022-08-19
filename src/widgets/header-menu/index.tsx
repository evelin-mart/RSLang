import React from 'react';
import styles from './styles.module.scss';
import { NavLink } from 'react-router-dom';
import { Box, List, ListItem } from '@mui/material';

const links: { title: string, href: string }[] = [
  {
    title: 'Учебник',
    href: '/textbook',
  },
  {
    title: 'Статистика',
    href: '/statistics',
  },
  {
    title: 'Аудиовызов',
    href: '/game/audio',
  },
  {
    title: 'Спринт',
    href: '/game/sprint',
  },
]

export const HeaderMenu = (props: {isColumn: boolean}) => {
  const { headerMenuItemLink, active, headerMenu, column } = styles;

  const checkDirection = (isColumn: boolean): string => {
    return isColumn 
    ? `${headerMenu} ${column}`
    : headerMenu}

  const checkActive = ({ isActive }: { isActive: boolean }) => isActive
    ? `${headerMenuItemLink} ${active}`
    : headerMenuItemLink;
  
  const linksRendered = links.map(({ title, href }, i) => (
    <ListItem key={i}>
      <NavLink className={checkActive} to={href}>{title}</NavLink>
    </ListItem>
  ));

  return (
    <Box component="nav">
      <List className={checkDirection(props.isColumn)}>
        {linksRendered}
      </List>
    </Box>
  )
}
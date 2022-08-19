import styles from './styles.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

export const AppLogo = (props: {isMobile: boolean}) => {
  return (
    <Link className={styles.logo} style={{flexGrow: props.isMobile ? 1 : 0}} to='/'>
      <Typography
            variant="h6"
            noWrap
            component='span'
            color='primary' 
            sx={{
              mr: 2,
              display: props.isMobile ? { xs: 'flex', md: 'none' } : {xs: 'none', md: 'flex'},
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
        RSLang
      </Typography>
    </Link>
  )
}

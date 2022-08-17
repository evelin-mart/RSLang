import styles from './styles.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

export const AppLogo = () => {
  return (
    <Link className={styles.logo} to='/'>
      <Typography variant="h1" sx={{ color: "primary.main", fontSize: 40, fontWeight: "medium" }}>
        RSLang
      </Typography>
    </Link>
  )
}

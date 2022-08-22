import styles from './styles.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export const AppLogo = (props: {isMobile: boolean}) => {
  return (
    <Link className={styles.logo} style={{flexGrow: props.isMobile ? 1 : 0}} to='/'>
      <span className={styles.logoText} style={{display: props.isMobile ? 'flex' : 'none'}}>RSLang</span>
    </Link>
  )
}

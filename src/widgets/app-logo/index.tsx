import React from 'react';
import { Link } from 'react-router-dom';

export const AppLogo = () => {
  return (
    <Link className="header__logo logo" to='/'>
      <h1>RSLang</h1>
    </Link>
  )
}

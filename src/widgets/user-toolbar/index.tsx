import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

export const UserToolbar = () => {
  return (
    <div className='user-toolbar'>
      <Link to="/auth">User login</Link>
    </div>
  )
}
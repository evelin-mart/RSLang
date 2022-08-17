import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

export const UserToolbar = () => {
  return (
    <div>
      <Link to="/auth">
        <Avatar sx={{ m: 1 }}>
          <LockOutlined />
        </Avatar>
      </Link>
    </div>
  )
}
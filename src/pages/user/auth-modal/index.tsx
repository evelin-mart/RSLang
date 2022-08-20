import React from 'react';
import { LoginForm } from 'features/user/login';
import { Modal } from '@mui/material';
import { useAppSelector, AppDispatch } from 'app/store';
import { toggleAuthModal } from 'pages/user/auth-modal/model';
import { useDispatch } from 'react-redux';
import { RegistrationForm } from 'features/user/registration';

const modalStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: 2,
};

export const AuthModal = () => {
  const { show, formType } = useAppSelector((state) => state.authModal);
  const dispatch: AppDispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleAuthModal(false));
  }
  
  return (
    <Modal
        sx={modalStyles}
        open={show}
        onClose={handleClose}
      >
      <>
        {formType === 'login'
          ? <LoginForm />
          : <RegistrationForm />}
      </>
    </Modal>
  )
}

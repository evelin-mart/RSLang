import React from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { resetLoginForm, submitLoginForm } from '../model';
import { setFormType } from 'pages/auth/modal/model';
import { AppDispatch, useAppSelector } from 'app/store';
import { FormFrame } from 'shared/components/form-frame';
import { UserLoginData } from 'shared/api/users';

const defaultInputsState: UserLoginData = {
  email: '',
  password: '',
}

export interface LoginFormValidationState {
  email: boolean;
  password: boolean;
}

const defaulValidationState: LoginFormValidationState = {
  email: false,
  password: false,
}

export const LoginForm = () => {
  const [ inputsState, setInputsState ] = React.useState<UserLoginData>(defaultInputsState);
  const [ inputsErrors, setInputsErrors ] = React.useState<LoginFormValidationState>(defaulValidationState);
  const { status, error, submitResult } = useAppSelector((state) => state.loginForm);
  const errorText = error || submitResult.error;
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(submitLoginForm({...inputsState}));
  }

  const handleChange = (key: keyof UserLoginData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsState({ ...inputsState, [key]: e.target.value });
    setInputsErrors({ ...inputsErrors, [key]: e.target.value === ''});
  }

  const handleRegistrationClick = () => {
    dispatch(setFormType('registration'));
    dispatch(resetLoginForm());
  }

  return (
    <FormFrame
      loading={status === 'loading'}
      handleButtonClick={handleRegistrationClick}
      title="Авторизация"
      buttonText="Зарегистрироваться">
      <Box
        sx={{ rowGap: 3, display: "flex", flexDirection: "column" }}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {errorText && <Typography sx={{ color: "error.light" }}>
          {errorText}
        </Typography>}
        <TextField
          required
          type="email"
          label="Email"
          placeholder="Email"
          value={inputsState.email}
          onChange={handleChange('email')}
          error={inputsErrors.email}
          autoFocus
        />
        <TextField
          required
          type="password"
          label="Password"
          placeholder="Password"
          value={inputsState.password}
          onChange={handleChange('password')}
          error={inputsErrors.password}
        />
        <LoadingButton
          type="submit"
          loading={status === 'loading'}
          loadingPosition="center"
          startIcon={<LoginIcon />}
          variant="contained"
        >
          Вход
        </LoadingButton>
      </Box>
    </FormFrame>
  )
}
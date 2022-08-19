import React from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { resetRegistrationForm, submitRegistrationForm } from '../model';
import { setFormType } from 'pages/auth/modal/model';
import { AppDispatch, useAppSelector } from 'app/store';
import { FormFrame } from 'shared/components/form-frame';
import * as usersApi from 'shared/api/users';

const defaultInputsState: usersApi.UserRegistrationData = {
  name: '',
  email: '',
  password: '',
}

export interface RegistrationFormValidationState {
  name: boolean;
  email: boolean;
  password: boolean;
}

const defaulValidationState: RegistrationFormValidationState = {
  name: false,
  email: false,
  password: false,
}

export const RegistrationForm = () => {
  const [ inputsState, setInputsState ] = React.useState<usersApi.UserRegistrationData>(defaultInputsState);
  const [ inputsErrors, setInputsErrors ] = React.useState<RegistrationFormValidationState>(defaulValidationState);
  const { status, error, submitResult } = useAppSelector((state) => state.registrationForm);

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(submitRegistrationForm({...inputsState}));
  };

  const handleChange = (key: keyof usersApi.UserRegistrationData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsState({ ...inputsState, [key]: e.target.value });
    setInputsErrors({ ...inputsErrors, [key]: e.target.value === ''});
  };

  const handleRegistrationClick = () => {
    dispatch(setFormType('login'));
    dispatch(resetRegistrationForm());
  };

  const renderErrors = (errors: { path: string, message: string }[]) => {
    return errors
      .map(({ path, message }) => (
        <Typography
          component="span"
          sx={{ display: "block", fontSize: 14 }}
          key={path[0]}>
          {message}
        </Typography>
      ));
  };

  const resultError = submitResult.error;
  const errorText = error || (resultError && typeof resultError === 'object'
    ? renderErrors(resultError.error.errors)
    : resultError);

  return (
    <FormFrame
      loading={status === 'loading'}
      handleButtonClick={handleRegistrationClick}
      title="Регистрация"
      buttonText="Уже зарегистрирован? Войти">
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
          type="text"
          label="Name"
          placeholder="Name"
          value={inputsState.name}
          onChange={handleChange('name')}
          error={inputsErrors.name}
          autoFocus
        />
        <TextField
          required
          type="email"
          label="Email"
          placeholder="Email"
          value={inputsState.email}
          onChange={handleChange('email')}
          error={inputsErrors.email}
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
          startIcon={<PersonAddIcon />}
          variant="contained"
        >
          Зарегистрироваться
        </LoadingButton>
      </Box>
    </FormFrame>
  )
}
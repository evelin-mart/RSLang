import React from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { AppDispatch, useAppSelector } from 'app/store';
import * as usersApi from 'shared/api/users';
import { submitForm } from 'entities/user';
import { defaultInputsState, defaulValidationState } from './model';
import { FormErrors } from './ui';
import { STATUS } from 'shared/constants';

export const RegistrationForm = () => {
  const [ inputsState, setInputsState ] = React.useState(defaultInputsState);
  const [ inputsErrors, setInputsErrors ] = React.useState(defaulValidationState);
  const { requestState, error } = useAppSelector((state) => state.user.formLoading);
  const loading = requestState.status === STATUS.LOADING;

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(submitForm({...inputsState}));
  };

  const handleChange = (key: keyof usersApi.UserRegistrationData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsState({ ...inputsState, [key]: e.target.value });
    setInputsErrors({ ...inputsErrors, [key]: e.target.value === ''});
  };

  const errorText = error
    ? typeof error === 'string'
      ? error
      : <FormErrors errors={error.error.errors}/>
    : error;

  return (
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
        loading={loading}
        loadingPosition="center"
        startIcon={<PersonAddIcon />}
        variant="contained"
      >
        Зарегистрироваться
      </LoadingButton>
    </Box>
  )
}
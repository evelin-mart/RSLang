import React from 'react';
import { useDispatch } from 'react-redux';
import { Page } from 'pages/page';
import { AppDispatch, useAppSelector } from 'app/store';
import { useUser, getUser, submitForm, deleteUser } from 'entities/user';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Refresh as RefreshIcon, Delete as DeleteIcon } from '@mui/icons-material';
import * as usersApi from 'shared/api/users';
import { LoadingButton } from '@mui/lab';


export const ProfilePage = () => {
  const { data: { name, email, userId } } = useUser();
  const [ inputsState, setInputsState ] = React.useState<usersApi.UserRegistrationData>({
    name, email,
    password: '',
  });
  const { requestState, error } = useAppSelector((state) => state.user.formLoading);
  const loading = requestState.status === 'loading';

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(submitForm({...inputsState}));
  };

  const handleChange = (key: keyof usersApi.UserRegistrationData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsState({ ...inputsState, [key]: e.target.value });
  };

  const handleGetUser = () => {
    dispatch(getUser());
  }

  const handleDeleteUser = () => {
    dispatch(deleteUser());
  }

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

  const errorText = error
    ? typeof error === 'string'
      ? error
      : renderErrors(error.error.errors)
    : error;

  return (
    <Page pageClassName="profile" title="Личный кабинет">
      <Box sx={{ width: "100%", display: "flex" }}>
        <Box
          sx={{ flexBasis: 400, rowGap: 3, display: "flex", flexDirection: "column" }}
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {errorText && <Typography sx={{ color: "error.light" }}>
            {errorText}
          </Typography>}
          <TextField
            type="text"
            label="Name"
            placeholder="Name"
            value={inputsState.name}
            onChange={handleChange('name')}
            autoFocus
          />
          <TextField
            type="email"
            label="Email"
            placeholder="Email"
            value={inputsState.email}
            onChange={handleChange('email')}
          />
          <TextField
            type="password"
            label="Password"
            placeholder="Password"
            value={inputsState.password}
            onChange={handleChange('password')}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button 
              disabled={loading} 
              variant="outlined" 
              color="error" 
              startIcon={<DeleteIcon />}
              onClick={handleDeleteUser}
            >
              Удалить
            </Button>
            <LoadingButton
              type="submit"
              loading={loading}
              loadingPosition="center"
              startIcon={<RefreshIcon />}
              variant="contained"
            >
              Обновить
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Page>
  )
}

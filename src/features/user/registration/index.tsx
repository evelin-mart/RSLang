import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, IconButton, TextField, Typography } from '@mui/material';
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  AddAPhoto as AddAPhotoIcon
} from '@mui/icons-material';
import { AppDispatch, useAppSelector } from 'app/store';
import * as usersApi from 'shared/api/users';
import { submitForm } from 'entities/user';
import { apiUrl, defaultInputsState, defaulValidationState } from './model';
import { FormErrors } from './ui';
import { STATUS } from 'shared/constants';

export const RegistrationForm = () => {
  const [ selectedFile, setSelectedFile ] = React.useState<File | null>(null);
  const [ inputsState, setInputsState ] = React.useState(defaultInputsState);
  const [ inputsErrors, setInputsErrors ] = React.useState(defaulValidationState);
  const { requestState, error } = useAppSelector((state) => state.user.formLoading);
  const loading = requestState.status === STATUS.LOADING;
  const fileUploadRef = useRef<HTMLInputElement>(null);
  
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(submitForm({...inputsState}));
  };

  const handleChange = (key: keyof usersApi.UserRegistrationData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsState({ ...inputsState, [key]: e.target.value });
    setInputsErrors({ ...inputsErrors, [key]: e.target.value === ''});
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    if (el.files !== null) {
      setSelectedFile(el.files[0]);
    }

    if (selectedFile === null) return;
    const formData = new FormData();
    
    formData.append('image', selectedFile);
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
  }

  const handleUploadClick = () => {
    fileUploadRef.current?.click();
  }

  const errorText = error
    ? typeof error === 'string'
      ? error
      : <FormErrors errors={error.error.errors}/>
    : requestState.error || error;

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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ position: "relative" }}>
          <Avatar sx={{ width: 120, height: 120 }} src={selectedFile ? URL.createObjectURL(selectedFile) : ''}>
            <PersonIcon sx={{ width: 100, height: 100 }} />
          </Avatar>
          <input
            style={{ display: "none"}}
            ref={fileUploadRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange} />
          <IconButton
            color="primary"
            sx={{
              position: "absolute",
              right: 0,
              bottom: 0,
              bgcolor: "action.focus"
            }}
            onClick={handleUploadClick}>
            <AddAPhotoIcon/>
          </IconButton>
        </Box>
      </Box>
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
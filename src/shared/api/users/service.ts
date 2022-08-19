import { BASE_URL } from 'shared/config';
import {
  UserLoginResult,
  UserLoginData,
  UserTokens,
  UserRegistrationResult,
  UserRegistrationData } from './interface';
import { processRequest, processAuthorizedRequest, withToken } from '../lib';

const url = `${BASE_URL}/users`;
const urlSignIn = `${BASE_URL}/signin`;

export const loginUser = async (userData: UserLoginData) => {
  return await processRequest<UserLoginResult>(urlSignIn, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
  });
}

export const getUserTokens = async (userId: string, refreshToken: string) => {
  return await processAuthorizedRequest<UserTokens>(
    `${url}/${userId}/tokens`, 
    withToken(refreshToken)
  );
}

export const createUser = async (userData: UserRegistrationData) => {
  return await processRequest<UserRegistrationResult>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
  })
}

export const getUser = async (token: string) => {
  
}

export const updateUser = async (token: string) => {
  
}

export const deleteUser = async (token: string) => {
  
}
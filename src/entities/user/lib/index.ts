import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { isUserRegistrationResult, UserTokens } from "shared/api/users";
import { UserData } from "../model";

let isAuthorized: boolean;

export const handleAuthorizationChange = ({ user }: RootState) => {
  const prevValue = isAuthorized;
  isAuthorized = user.isAuthorized;

  if (prevValue !== isAuthorized) {
    if (isAuthorized) {
      localStorage.setItem('user', JSON.stringify(user.data));
    } else {
      localStorage.removeItem('user');
    }
  }
}

export const saveDataToStoreMiddleware: Middleware = (store) => (next) => (action) => {
  let newData = null;
  
  if (action.type === 'user/updateTokens') {
    newData = action.payload;
  } else if (action.type === 'user/submitForm/fulfilled') {
    if (isUserRegistrationResult(action.payload)) {
      newData = action.payload;
    }
  }
  
  if (newData !== null) {
    const rawData = localStorage.getItem('user');
    if (rawData) {
      const data = JSON.parse(rawData);
      localStorage.setItem('user', JSON.stringify({ ...data, ...action.payload }));
    }
  }
  return next(action);
}

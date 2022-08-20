import { Middleware } from '@reduxjs/toolkit';
import { UserTokens } from '../users/interface';
import { updateTokens, UserData } from 'entities/user';
import { getUserTokens } from '../users';
import { store } from 'app/store';
import { deauthorize } from 'entities/user';
import { BASE_URL } from 'shared/config';

export class HttpError extends Error {
  public status: number;
  public error: string | Object;

  constructor(res: Response, error: string | Object) {
    super(`Http error: ${res.statusText}`);
    this.status = res.status;
    this.error = error;
  } 
}

let authorizedUserData: UserData;

export const saveTokensMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === 'user/authorize') {
    const user = action.payload as UserData;
    authorizedUserData = user;
  } else if (action.type === 'user/updateTokens') {
    const { token, refreshToken } = action.payload as UserTokens;
    authorizedUserData.token = token;
    authorizedUserData.refreshToken = refreshToken;
  }

  return next(action);
}

export const withToken = (token: string, requestInit: RequestInit = {}) => {
  return { ...requestInit, headers: {
    ...requestInit.headers,
    'Authorization': `Bearer ${token}`,
  }}
}

export const getResponseBody = async (res: Response): Promise<string | Object> => {
  const contentType = res.headers.get('Content-Type');
  if (!contentType) return '';
  const isJson = contentType?.includes('application/json');
  return isJson ? res.json() : res.text();
}

export const processRequest = async <T>(url: string, requestInit: RequestInit = {}): Promise<T> => {
  const res = await fetch(url, requestInit);

  if (!res.ok) {     
    const error = await getResponseBody(res);
    throw new HttpError(res, error);
  }
  return (await getResponseBody(res)) as T;
}

const getUrl = () => {
  const { userId } = authorizedUserData;
  return `${BASE_URL}/users/${userId}`;
}

export const processAuthorizedRequest = async <T>(requestInit: RequestInit = {}): Promise<T> => {
  try {
    const { token } = authorizedUserData;
    return processRequest<T>(getUrl(), withToken(token, requestInit));
    
  } catch (error) {
    if (error instanceof HttpError && [401, 402, 403].includes(error.status)) {
      try {
        const { userId, refreshToken } = authorizedUserData;
        const newTokens = await getUserTokens(userId, refreshToken);
        store.dispatch(updateTokens(newTokens));
        return processAuthorizedRequest(requestInit);
      } catch {
        store.dispatch(deauthorize());
      }
    }
    throw error;
  }
}
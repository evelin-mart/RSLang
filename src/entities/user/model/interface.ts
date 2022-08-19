import { LoadingState } from 'shared/lib';

export interface UserData {
  userId: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

export const isUserData = (data: unknown): data is UserData => {
  const requiredProps = ['userId', 'name', 'email', 'token', 'refreshToken'];
  return (
    data !== null
    && typeof data === 'object'
    && requiredProps.every((prop) => data.hasOwnProperty(prop))
  );
}

export interface UserState extends LoadingState {
  data: UserData;
  isAuthorized: boolean;
}
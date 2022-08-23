import { UserRegistrationError } from 'shared/api/users';
import { LoadingState } from 'shared/lib';

export interface UserData {
  userId: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

export type UserDataNoTokens = Omit<UserData, 'token' | 'refreshToken'>;

export const isUserData = (data: unknown): data is UserData => {
  const requiredProps = ['userId', 'name', 'email', 'token', 'refreshToken'];
  return (
    data !== null
    && typeof data === 'object'
    && requiredProps.every((prop) => Object.prototype.hasOwnProperty.call(data, prop))
  );
}

export type FormLoadingError = UserRegistrationError | string | null;

export interface UserState {
  startupLoading: LoadingState,
  formLoading: {
    requestState: LoadingState,
    error: FormLoadingError,
  },
  data: UserData;
  isAuthorized: boolean;
  isHeaderMenuOpened: boolean;
}
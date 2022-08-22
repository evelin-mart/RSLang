export interface UserTokens {
  token: string;
  refreshToken: string;
}

export interface UserLoginResult extends UserTokens {
  message: string;
  userId: string;
  name: string;
  error: string | null;
}

export const defaultLoginResult: UserLoginResult = {
  token: '',
  refreshToken: '',
  message: '',
  userId: '',
  name: '',
  error: null,
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegistrationError {
  error: {
    status: string;
    errors: { path: string, message: string }[];
  }
}

export interface UserRegistrationResult {
  id: string,
  email: string,
  name: string;
  error: UserRegistrationError | string | null;
}

export const isUserRegistrationResult = (obj: unknown): obj is UserRegistrationResult => {
  const props = ['id', 'email', 'name'];
  return (
    obj !== null 
    && typeof obj === 'object' 
    && props.every((prop) => Object.prototype.hasOwnProperty.call(obj, prop))
  );
}

export const defaultRegistartionResult: UserRegistrationResult = {
  id: '',
  email: '',
  name: '',
  error: null,
}

export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
}

export const isUserRegistrationData = (obj: unknown): obj is UserRegistrationData => {
  return (
    obj !== null 
    && typeof obj === 'object' 
    && Object.prototype.hasOwnProperty.call(obj, 'name')
  );
}

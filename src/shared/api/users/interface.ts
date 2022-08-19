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

export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
}

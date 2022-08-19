export interface UserData {
  userId: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface UserState {
  data: UserData;
  isAuthorized: boolean;
}
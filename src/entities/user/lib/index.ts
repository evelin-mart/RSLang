import { RootState } from "app/store";

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
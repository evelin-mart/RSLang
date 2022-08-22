import * as usersApi from 'shared/api/users';

export const apiKey = '0dbdeb7491d79476b5609fc575c74034';
export const apiUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

export const defaultInputsState: usersApi.UserRegistrationData = {
  name: 'tester',
  email: 'tester@test',
  password: '1234',
}

export interface ValidationState {
  name: boolean;
  email: boolean;
  password: boolean;
}

export const defaulValidationState: ValidationState = {
  name: false,
  email: false,
  password: false,
}
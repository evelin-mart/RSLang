import { UserLoginData } from "shared/api/users";

export const defaultInputsState: UserLoginData = {
  email: 'test@test.ru',
  password: '12345678',
}

export interface ValidationState {
  email: boolean;
  password: boolean;
}

export const defaulValidationState: ValidationState = {
  email: false,
  password: false,
}

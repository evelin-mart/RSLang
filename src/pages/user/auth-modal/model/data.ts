import { FormType } from "./store"

export type FormData = Record<FormType, {
  buttonText: string;
  title: string;
}>

export const formData: FormData = {
  'login': {
    buttonText: "Зарегистрироваться",
    title: "Авторизация",
  },
  'registration': {
    buttonText: "Уже зарегистрирован? Войти",
    title: "Регистрация",
  }
}
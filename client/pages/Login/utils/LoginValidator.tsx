import { Objects } from '@core/utils'

const emailRegex = /.+@.+\..+/

const validateEmail = (email: string): string => {
  if (Objects.isEmpty(email)) return 'login.emptyEmail'
  if (!emailRegex.test(email)) return 'login.invalidEmail'
  return null
}

const validatePassword = (password: string): string => {
  if (Objects.isEmpty(password)) return 'login.noEmptyPassword'
  if (password.length < 6) return 'login.noShortPassword'
  return null
}

const validatePasswords = (password: string, password2: string): string => {
  if (password !== password2) return 'login.noMatchPasswords'
  return null
}

export const LoginValidator = {
  localValidate: (email: string, password: string, password2: string) => {
    return {
      email: validateEmail(email),
      password: validatePassword(password),
      password2: password2 !== undefined ? validatePasswords(password, password2) : null,
    }
  },
}

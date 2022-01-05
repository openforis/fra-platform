import { Objects } from '@core/utils'

const validateEmail = (email: string): string => {
  if (Objects.isEmpty(email)) return 'login.emptyEmail'
  const emailRegex = /.+@.+\..+/
  if (!emailRegex.test(email)) return 'login.invalidEmail'
  return null
}

const validatePassword = (password: string): string => {
  if (Objects.isEmpty(password)) return 'login.noEmptyPassword'
  if (password.length < 6) return 'login.noShortPassword'
  return null
}

export const LoginValidator = {
  localValidate: (email: string, password: string) => {
    return { email: validateEmail(email), password: validatePassword(password) }
  },
}

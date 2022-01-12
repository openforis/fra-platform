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
  console.log(password, password2)
  if (password !== password2) return 'login.noEqualPasswords'
  return null
}

export const LoginValidator = {
  localValidate: (email: string, password: string) => {
    return { email: validateEmail(email), password: validatePassword(password) }
  },
  invitationValidate: (email: string, password: string, password2: string) => {
    return { ...LoginValidator.localValidate(email, password), password2: validatePassword(password2), passwords: validatePasswords(password, password2) }
  },
}

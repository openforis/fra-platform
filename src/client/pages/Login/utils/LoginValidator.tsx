import { Objects } from 'utils/objects'

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

export const isError = (errors: Record<string, string>): boolean => !!Object.values(errors).find((value) => !!value)

export const LoginValidator = {
  localValidate: (email: string, password: string): Record<string, string> => {
    return {
      email: validateEmail(email),
      password: validatePassword(password),
    }
  },
  invitationValidate: (email: string, password: string, password2: string): Record<string, string> => {
    return {
      email: validateEmail(email),
      password: validatePassword(password),
      password2: validatePasswords(password, password2),
    }
  },
  resetPasswordValidate: (email: string): Record<string, string> => {
    return {
      email: validateEmail(email),
    }
  },
}

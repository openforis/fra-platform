import { TFunction } from 'i18next'
import { z, ZodEmail, ZodString } from 'zod'

export const emailValidationSchema = (t: TFunction): ZodEmail => {
  return z.email({ message: t('login.invalidEmail') })
}

export const passwordValidationSchema = (t: TFunction, minLength = 8): ZodString => {
  return z
    .string()
    .min(1, { message: t('login.noEmptyPassword') })
    .min(minLength, { message: t('login.passwordMinLength', { count: minLength }) })
}

import { z, ZodString } from 'zod'

export const emailValidationSchema = (t: (key: string) => string): z.ZodString => {
  return z
    .string()
    .min(1, { message: t('login.emptyEmail') })
    .email({ message: t('login.invalidEmail') })
}

export const passwordValidationSchema = (t: (key: string) => string): ZodString => {
  return z
    .string()
    .min(1, { message: t('login.noEmptyPassword') })
    .min(6, { message: t('login.passwordMinLength') })
    .refine((password) => /[a-z]/.test(password), { message: t('login.passwordLowercase') })
    .refine((password) => /[A-Z]/.test(password), { message: t('login.passwordUppercase') })
    .refine((password) => /[0-9]/.test(password), { message: t('login.passwordNumber') })
}

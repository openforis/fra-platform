import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { FormValidationSchema } from 'client/components/Form/types'

export const useValidationSchema = (): FormValidationSchema => {
  const { t } = useTranslation()

  return useMemo<FormValidationSchema>(() => {
    const passwordSchema = z
      .string()
      .min(1, { message: t('login.noEmptyPassword') })
      .min(6, { message: t('login.passwordMinLength') })
      .refine((password) => /[a-z]/.test(password), { message: t('login.passwordLowercase') })
      .refine((password) => /[A-Z]/.test(password), { message: t('login.passwordUppercase') })
      .refine((password) => /[0-9]/.test(password), { message: t('login.passwordNumber') })

    return z
      .object({
        email: z.string().min(1, { message: t('login.emptyEmail') }),
        password: passwordSchema,
        password2: z.string().min(1, { message: t('login.noEmptyPassword') }),
      })
      .refine((data) => data.password === data.password2, {
        message: t('login.noMatchPasswords'),
        path: ['password2'],
      })
  }, [t])
}

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { FormValidationSchema } from 'client/components/Form/types'
import { emailValidationSchema, passwordValidationSchema } from 'client/pages/Login/validationSchemas'

export const useValidationSchema = (): FormValidationSchema => {
  const { t } = useTranslation()

  return useMemo<FormValidationSchema>(() => {
    return z
      .object({
        email: emailValidationSchema(t),
        password: passwordValidationSchema(t),
        password2: z.string().min(1, { message: t('login.noEmptyPassword') }),
      })
      .refine((data) => data.password === data.password2, {
        message: t('login.noMatchPasswords'),
        path: ['password2'],
      })
  }, [t])
}

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import { z, ZodEmail, ZodString } from 'zod'

import { FormValidationSchema } from 'client/components/Form/types'

const emailValidationSchema = (t: TFunction): ZodEmail => {
  return z.email({ message: t('login.invalidEmail') })
}

const passwordValidationSchema = (t: TFunction, minLength = 8): ZodString => {
  return z
    .string()
    .min(1, { message: t('login.noEmptyPassword') })
    .min(minLength, { message: t('login.passwordMinLength', { count: minLength }) })
    .max(100, { message: t('login.passwordMaxLength', { count: 100 }) })
}

interface Props {
  password: boolean
  password2: boolean
}

export const useValidationSchema = (props: Props): FormValidationSchema => {
  const { password, password2 } = props
  const { t } = useTranslation()

  return useMemo<FormValidationSchema>(() => {
    const schemaObject: Record<string, z.ZodTypeAny> = {
      email: emailValidationSchema(t),
    }

    if (password) {
      // If password 2 is set, we are changing or creating a password - use complex validation
      schemaObject.password = password2
        ? passwordValidationSchema(t)
        : z.string().min(1, { message: t('login.noEmptyPassword') })
    }

    if (password2) {
      schemaObject.password2 = z.string().min(1, { message: t('login.noEmptyPassword') })
    }

    const schema = z.object(schemaObject)

    if (password2) {
      const params = { message: t('login.noMatchPasswords'), path: ['password2'] }
      return schema.refine((data): boolean => data.password === data.password2, params)
    }

    return schema
  }, [password, password2, t])
}

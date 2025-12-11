import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { AuthProvider } from 'meta/user/auth'
import { User } from 'meta/user/user'

import { FormValidationSchema } from 'client/components/Form/types'
import { emailValidationSchema, passwordValidationSchema } from 'client/pages/Login/validationSchemas'

import { useShowPassword2 } from './useShowPassword2'

type Props = { userProviders: Array<AuthProvider>; invitedUser: User }

export const useValidationSchema = (props: Props): FormValidationSchema => {
  const { invitedUser, userProviders } = props
  const { t } = useTranslation()

  const showPassword2 = useShowPassword2({ invitedUser, userProviders })

  return useMemo<FormValidationSchema>(() => {
    const schema: Record<string, z.ZodTypeAny> = {
      email: emailValidationSchema(t),
      password: passwordValidationSchema(t),
    }

    if (showPassword2) {
      schema.password2 = passwordValidationSchema(t)
    }

    const baseSchema = z.object(schema)

    if (showPassword2) {
      return baseSchema.refine((data) => data.password === data.password2, {
        message: t('login.passwordsDoNotMatch'),
        path: ['password2'],
      })
    }

    return baseSchema
  }, [showPassword2, t])
}

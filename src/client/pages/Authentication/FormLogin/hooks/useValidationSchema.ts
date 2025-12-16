import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { FormValidationSchema } from 'client/components/Form/types'

interface Props {
  password: boolean
}

export const useValidationSchema = (props: Props): FormValidationSchema => {
  const { password } = props
  const { t } = useTranslation()

  return useMemo<FormValidationSchema>((): FormValidationSchema => {
    const schema: Record<string, z.ZodTypeAny> = {
      email: z.email(),
    }

    if (password) {
      schema.password = z.string().min(1, { message: t('login.noEmptyPassword') })
    }

    return z.object(schema)
  }, [password, t])
}

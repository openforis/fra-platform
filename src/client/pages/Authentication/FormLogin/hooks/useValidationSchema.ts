import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { FormValidationSchema } from 'client/components/Form/types'

export const useValidationSchema = (): FormValidationSchema => {
  const { t } = useTranslation()

  return useMemo<FormValidationSchema>((): FormValidationSchema => {
    return z.object({
      email: z.email(),
      password: z.string().min(1, { message: t('login.noEmptyPassword') }),
    })
  }, [t])
}

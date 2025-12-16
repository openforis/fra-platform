import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { FormValidationSchema } from 'client/components/Form/types'
import { emailValidationSchema } from 'client/pages/LoginDeprecated/validationSchemas'

export const useValidationSchema = (): FormValidationSchema => {
  const { t } = useTranslation()

  return useMemo<FormValidationSchema>(() => {
    return z.object({
      email: emailValidationSchema(t),
    })
  }, [t])
}

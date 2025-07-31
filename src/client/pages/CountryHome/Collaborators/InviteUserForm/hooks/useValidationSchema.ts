import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { z } from 'zod'

import { FormSchemas } from 'client/components/Form/formSchemas'
import { FormValidationSchema } from 'client/components/Form/types'

export const useValidationSchema = (): FormValidationSchema => {
  const { t } = useTranslation()

  return useMemo<FormValidationSchema>(() => {
    return z.object({
      name: z.string().min(2, { error: t('form.errors.mustBeAtLeastNCharacters', { field: t('common.name'), n: 2 }) }),
      email: z.email(t('form.errors.invalid', { field: t('common.email') })),
      language: z.string().min(1, { error: t('form.errors.required', { field: t('common.language') }) }),
      permissions: FormSchemas.getPermissions(t),
      role: z.string().min(1, { error: t('form.errors.required', { field: t('editUser.role') }) }),
      surname: z
        .string()
        .min(2, { error: t('form.errors.mustBeAtLeastNCharacters', { field: t('editUser.surname'), n: 2 }) }),
    })
  }, [t])
}

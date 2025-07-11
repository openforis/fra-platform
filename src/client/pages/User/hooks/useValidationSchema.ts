import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { z } from 'zod'

import { FormValidationSchema } from 'client/components/Form/types'
import { useRoleValidationSchema } from 'client/pages/User/hooks/useRoleValidationSchema'

export const useValidationSchema = (): FormValidationSchema => {
  const { t } = useTranslation()

  const roleSchema = useRoleValidationSchema()

  return useMemo<FormValidationSchema>(() => {
    return z.object({
      profilePicture: z.any().optional(),
      user: z.object({
        email: z.email(t('form.errors.invalid', { field: t('common.email') })),
        id: z.number(),
        props: z.object({
          name: z
            .string()
            .min(2, { error: t('form.errors.mustBeAtLeastNCharacters', { field: t('common.name'), n: 2 }) }),
          surname: z
            .string()
            .min(2, { error: t('form.errors.mustBeAtLeastNCharacters', { field: t('editUser.surname'), n: 2 }) }),
          title: z.string().min(1, { error: t('form.errors.required', { field: t('editUser.title') }) }),
        }),
      }),
      role: roleSchema.optional(),
    })
  }, [roleSchema, t])
}

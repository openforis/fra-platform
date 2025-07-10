import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { z } from 'zod'

export const useCollaboratorPropsValidationSchema = () => {
  const { t } = useTranslation()

  return useMemo(() => {
    return z.object({
      role: z.object({
        uuid: z.string(),
        props: z.object({
          professionalTitle: z.string().optional(),
          organizationalUnit: z.string().optional(),
          organization: z.string().min(1, t('form.errors.required', { field: t('editUser.organization') })),
          address: z.object({
            street: z.string().min(1, t('form.errors.required', { field: t('editUser.street') })),
            zipCode: z.string().min(1, t('form.errors.required', { field: t('editUser.zipCode') })),
            poBox: z.string().optional(),
            city: z.string().min(1, t('form.errors.required', { field: t('editUser.city') })),
            countryIso: z.string().optional(),
          }),
          secondaryEmail: z
            .string()
            .email(t('form.errors.invalid', { field: t('editUser.secondaryEmail') }))
            .optional()
            .or(z.literal('')),
          primaryPhoneNumber: z.string().min(1, t('form.errors.required', { field: t('editUser.primaryPhoneNumber') })),
          secondaryPhoneNumber: z.string().optional(),
          skype: z.string().optional(),
          contactPreference: z.string().optional(),
        }),
      }),
    })
  }, [t])
}

import { TFunction } from 'i18next'
import { z } from 'zod'

import { FormValidationSchema } from 'client/components/Form/types'

type Props = {
  t: TFunction
}

export const newValidationSchema = (props: Props): FormValidationSchema => {
  const { t } = props

  return z.object({
    name: z.string().min(2, t('form.errors.mustBeAtLeastNCharacters', { field: t('common.name'), n: 2 })),
    email: z.string().email(t('form.errors.invalid', { field: t('common.email') })),
    language: z.string().min(1, t('form.errors.required', { field: t('common.language') })),
    permissions: z
      .object({
        tableData: z
          .array(z.string())
          .min(1, t('form.errors.atLeastOneItemRequired', { field: t('userManagement.permissionNames.tableData') })),
        descriptions: z
          .array(z.string())
          .min(1, t('form.errors.atLeastOneItemRequired', { field: t('userManagement.permissionNames.descriptions') })),
      })
      .optional(),
    role: z.string().min(1, t('form.errors.required', { field: t('editUser.role') })),
    surname: z.string().min(2, t('form.errors.mustBeAtLeastNCharacters', { field: t('editUser.surname'), n: 2 })),
  })
}

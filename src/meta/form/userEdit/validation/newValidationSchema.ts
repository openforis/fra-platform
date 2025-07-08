import { TFunction } from 'i18next'
import { z } from 'zod'

import { FormValidationSchema } from 'client/components/Form/types'

type Props = {
  t: TFunction
}

export const newValidationSchema = (props: Props): FormValidationSchema => {
  const { t } = props

  // return z.object({
  //   profilePicture: z.any().optional(),
  //   user_id: z.number(),
  //   user_email: z.string().email(t('form.errors.invalid', { field: t('common.email') })),
  //   user_props_name: z.string().min(2, t('form.errors.mustBeAtLeastNCharacters', { field: t('common.name'), n: 2 })),
  //   user_props_surname: z
  //     .string()
  //     .min(2, t('form.errors.mustBeAtLeastNCharacters', { field: t('editUser.surname'), n: 2 })),
  //   user_props_title: z.string().min(1, t('form.errors.required', { field: t('editUser.title') })),
  // })

  return z.object({
    profilePicture: z.any().optional(),
    user: z.object({
      id: z.number(),
      email: z.string().email(t('form.errors.invalid', { field: t('common.email') })),
      props: z.object({
        name: z.string().min(2, t('form.errors.mustBeAtLeastNCharacters', { field: t('common.name'), n: 2 })),
        surname: z.string().min(2, t('form.errors.mustBeAtLeastNCharacters', { field: t('editUser.surname'), n: 2 })),
        title: z.string().min(1, t('form.errors.required', { field: t('editUser.title') })),
      }),
    }),
  })
}

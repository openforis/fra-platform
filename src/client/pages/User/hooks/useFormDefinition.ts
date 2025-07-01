import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { z } from 'zod'

import { Contacts } from 'meta/cycleData'

import { useUser } from 'client/store/user/hooks/user'
import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'

export const useFormDefinition = (): FormDefinition => {
  const targetUser = useUser()
  const { t } = useTranslation()

  return useMemo<FormDefinition>(() => {
    const fields: Array<FieldDefinition> = [
      {
        name: 'userId',
        type: FormFieldType.hidden,
        label: '',
        defaultValue: targetUser?.id,
        validation: z.number().optional(),
      },
      {
        name: 'profilePicture',
        type: FormFieldType.avatar,
        label: '',
        validation: z.any().optional(),
      },
      {
        name: 'email',
        type: FormFieldType.text,
        validation: z.string().email(t('form.errors.invalid', { field: t('common.email') })),
        label: 'editUser.email',
        defaultValue: targetUser?.email || '',
      },
      {
        name: 'name',
        type: FormFieldType.text,
        validation: z.string().min(2, t('form.errors.mustBeAtLeastNCharacters', { field: t('common.name'), n: 2 })),
        label: 'common.name',
        defaultValue: targetUser?.props?.name || '',
      },
      {
        name: 'surname',
        type: FormFieldType.text,
        validation: z
          .string()
          .min(2, t('form.errors.mustBeAtLeastNCharacters', { field: t('editUser.surname'), n: 2 })),
        label: 'editUser.surname',
        defaultValue: targetUser?.props?.surname || '',
      },
      {
        name: 'title',
        type: FormFieldType.select,
        options: Contacts.appellations.map((appellation) => {
          const label = t(`editUser.${appellation}`)
          const value = appellation
          return { label, value }
        }),
        validation: z.string().min(1, t('form.errors.required', { field: t('editUser.title') })),
        label: 'editUser.title',
        placeholder: t('editUser.title'),
        defaultValue: targetUser?.props?.title || '',
      },
    ]

    return { fields }
  }, [t, targetUser])
}

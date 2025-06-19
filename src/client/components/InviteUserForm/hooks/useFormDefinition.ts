import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { z } from 'zod'

import { RoleName } from 'meta/user'

import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'

export const useFormDefinition = (): FormDefinition => {
  const { t } = useTranslation()

  return useMemo<FormDefinition>(() => {
    const fields: Array<FieldDefinition> = [
      {
        name: 'name',
        type: FormFieldType.text,
        validation: z.string().min(2, t('form.errors.mustBeAtLeastNCharacters', { field: t('common.name'), n: 2 })),
        label: 'common.name',
      },
      {
        name: 'surname',
        type: FormFieldType.text,
        validation: z
          .string()
          .min(2, t('form.errors.mustBeAtLeastNCharacters', { field: t('editUser.surname'), n: 2 })),
        label: 'editUser.surname',
      },
      {
        name: 'email',
        type: FormFieldType.text,
        validation: z.string().email(t('form.errors.invalid', { field: t('common.email') })),
        label: 'editUser.email',
      },
      {
        name: 'role',
        type: FormFieldType.userRole,
        validation: z.string().min(1, t('form.errors.required', { field: t('editUser.role') })),
        label: 'common.role',
        placeholder: t('userManagement.placeholder'),
      },
      {
        name: 'language',
        type: FormFieldType.language,
        validation: z.string().min(1, t('form.errors.required', { field: t('common.language') })),
        label: 'common.language',
      },
      {
        name: 'permissions',
        type: FormFieldType.permissions,
        label: 'userManagement.permissions',
        validation: z.any().optional(),
        shouldShow: (watchValues) => watchValues.role === RoleName.COLLABORATOR,
      },
    ]

    return { fields }
  }, [t])
}

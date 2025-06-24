import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { z } from 'zod'

import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user'

import { useLanguage } from 'client/hooks/useLanguage'
import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'

export const useFormDefinition = (): FormDefinition => {
  const { t } = useTranslation()
  const currentLanguage = useLanguage()

  return useMemo<FormDefinition>(() => {
    const fields: Array<FieldDefinition> = [
      {
        name: 'name',
        type: FormFieldType.text,
        validation: z.string().min(2, t('form.errors.mustBeAtLeastNCharacters', { field: t('common.name'), n: 2 })),
        label: 'common.name',
        defaultValue: '',
      },
      {
        name: 'surname',
        type: FormFieldType.text,
        validation: z
          .string()
          .min(2, t('form.errors.mustBeAtLeastNCharacters', { field: t('editUser.surname'), n: 2 })),
        label: 'editUser.surname',
        defaultValue: '',
      },
      {
        name: 'email',
        type: FormFieldType.text,
        validation: z.string().email(t('form.errors.invalid', { field: t('common.email') })),
        label: 'editUser.email',
        defaultValue: '',
      },
      {
        name: 'role',
        type: FormFieldType.userRole,
        validation: z.string().min(1, t('form.errors.required', { field: t('editUser.role') })),
        label: 'common.role',
        placeholder: t('userManagement.placeholder'),
        defaultValue: '',
      },
      {
        name: 'language',
        type: FormFieldType.language,
        validation: z.string().min(1, t('form.errors.required', { field: t('common.language') })),
        label: 'common.language',
        defaultValue: currentLanguage || Lang.en,
      },
      {
        name: 'permissions',
        type: FormFieldType.permissions,
        label: 'userManagement.permissions',
        validation: z.any().optional(),
        shouldShow: (watchValues) => watchValues.role === RoleName.COLLABORATOR,
        defaultValue: { tableData: ['all'], descriptions: ['all'] },
      },
    ]

    return { fields }
  }, [currentLanguage, t])
}

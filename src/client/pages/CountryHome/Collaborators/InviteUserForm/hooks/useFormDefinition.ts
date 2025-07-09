import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user'

import { useLanguage } from 'client/hooks/useLanguage'
import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'

export const useFormDefinition = (): FormDefinition => {
  const { t } = useTranslation()
  const language = useLanguage()

  return useMemo<FormDefinition>(() => {
    const fields: Array<FieldDefinition> = [
      {
        name: 'name',
        type: FormFieldType.text,
        label: 'common.name',
        defaultValue: '',
      },
      {
        name: 'surname',
        type: FormFieldType.text,
        label: 'editUser.surname',
        defaultValue: '',
      },
      {
        name: 'email',
        type: FormFieldType.text,
        label: 'editUser.email',
        defaultValue: '',
      },
      {
        name: 'role',
        type: FormFieldType.userRole,
        label: 'common.role',
        placeholder: t('userManagement.placeholder'),
        defaultValue: '',
      },
      {
        name: 'language',
        type: FormFieldType.language,
        label: 'common.language',
        defaultValue: language || Lang.en,
      },
      {
        name: 'permissions',
        type: FormFieldType.permissions,
        label: 'userManagement.permissions',
        shouldShow: (watchValues) => watchValues.role === RoleName.COLLABORATOR,
        defaultValue: { tableData: ['all'], descriptions: ['all'] },
      },
    ]

    return { fields }
  }, [language, t])
}

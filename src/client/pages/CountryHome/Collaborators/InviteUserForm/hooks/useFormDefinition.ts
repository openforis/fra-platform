import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useLanguage } from 'client/hooks/language'
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
        required: true,
      },
      {
        name: 'surname',
        type: FormFieldType.text,
        label: 'editUser.surname',
        defaultValue: '',
        required: true,
      },
      {
        name: 'email',
        type: FormFieldType.text,
        label: 'editUser.email',
        defaultValue: '',
        required: true,
      },
      {
        name: 'role',
        type: FormFieldType.userRole,
        label: 'common.role',
        placeholder: t('userManagement.placeholder'),
        defaultValue: '',
        required: true,
      },
      {
        name: 'language',
        type: FormFieldType.language,
        label: 'common.language',
        defaultValue: language || Lang.en,
        required: true,
      },
      {
        name: 'permissions',
        type: FormFieldType.permissions,
        label: 'userManagement.permissions',
        shouldShow: (watchValues) => watchValues.role === RoleName.COLLABORATOR,
        defaultValue: UserRoles.getDefaultCollaboratorPermissions(),
        required: true,
      },
    ]

    return { fields }
  }, [language, t])
}

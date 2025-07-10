import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Contacts } from 'meta/cycleData'
import { Users } from 'meta/user'

import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'
import { PropsFormDefinition } from 'client/pages/User/hooks/types'
import { useRolePropsFields } from 'client/pages/User/hooks/useRolePropsFields'

export const useFormDefinition = (props: PropsFormDefinition): FormDefinition | undefined => {
  const { editUserRules, targetUser } = props

  const { t } = useTranslation()
  const rolePropsFields = useRolePropsFields(props)

  const { emailDisabled } = editUserRules

  return useMemo<FormDefinition>(() => {
    if (Objects.isNil(targetUser)) return undefined

    const fields: Array<FieldDefinition> = [
      {
        name: 'user.id',
        type: FormFieldType.hidden,
        label: '',
        defaultValue: targetUser?.id,
      },
      {
        defaultValue: Users.profilePictureUri(targetUser?.id),
        name: 'profilePicture',
        type: FormFieldType.avatar,
        label: '',
      },
      {
        name: 'user.email',
        type: FormFieldType.text,
        label: 'editUser.email',
        defaultValue: targetUser?.email || '',
        isDisabled: () => emailDisabled,
      },
      {
        name: 'user.props.name',
        type: FormFieldType.text,
        label: 'common.name',
        defaultValue: targetUser?.props?.name || '',
      },
      {
        name: 'user.props.surname',
        type: FormFieldType.text,
        label: 'editUser.surname',
        defaultValue: targetUser?.props?.surname || '',
      },
      {
        name: 'user.props.title',
        type: FormFieldType.select,
        options: Contacts.appellations.map((appellation) => {
          const label = t(`editUser.${appellation}`)
          const value = appellation
          return { label, value }
        }),
        label: 'editUser.title',
        placeholder: t('editUser.title'),
        defaultValue: targetUser?.props?.title || '',
      },
    ]

    fields.push(...rolePropsFields)

    return { fields }
  }, [emailDisabled, rolePropsFields, t, targetUser])
}

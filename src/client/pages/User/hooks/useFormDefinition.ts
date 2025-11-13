import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Contacts } from 'meta/cycleData/contacts'
import { Users } from 'meta/user'

import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'

import { PropsFormDefinition } from './types'
import { useRolePropsFields } from './useRolePropsFields'
import { useRolesFields } from './useRolesFields'

export const useFormDefinition = (props: PropsFormDefinition): FormDefinition | undefined => {
  const { editUserRules, targetUser } = props

  const { t } = useTranslation()

  const rolePropsFields = useRolePropsFields(props)
  const rolesFields = useRolesFields(props)

  const { emailDisabled, userDisabled } = editUserRules

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
        watches: {
          isDisabled: () => userDisabled,
        },
      },
      {
        name: 'user.email',
        type: FormFieldType.text,
        label: 'editUser.email',
        defaultValue: targetUser?.email || '',
        required: true,
        watches: {
          isDisabled: () => userDisabled || emailDisabled,
        },
      },
      {
        defaultValue: targetUser?.props?.name || '',
        label: 'common.name',
        name: 'user.props.name',
        required: true,
        type: FormFieldType.text,
        watches: {
          isDisabled: () => userDisabled,
        },
      },
      {
        name: 'user.props.surname',
        type: FormFieldType.text,
        label: 'editUser.surname',
        defaultValue: targetUser?.props?.surname || '',
        required: true,
        watches: {
          isDisabled: () => userDisabled,
        },
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
        required: true,
        watches: {
          isDisabled: () => userDisabled,
        },
      },
    ]

    fields.push(...rolePropsFields)
    fields.push(...rolesFields)

    return { fields }
  }, [emailDisabled, rolePropsFields, rolesFields, t, targetUser, userDisabled])
}

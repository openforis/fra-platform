import { TFunction } from 'i18next'

import { Contacts } from 'meta/cycleData'
import { User, Users } from 'meta/user'

import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'

type Props = {
  t: TFunction
  targetUser: User
}

export const newFormDefinition = (props: Props): FormDefinition => {
  const { t, targetUser } = props

  const fields: Array<FieldDefinition> = [
    {
      name: 'user_id',
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
      name: 'user_email',
      type: FormFieldType.text,
      label: 'editUser.email',
      defaultValue: targetUser?.email || '',
    },
    {
      name: 'user_props_name',
      type: FormFieldType.text,
      label: 'common.name',
      defaultValue: targetUser?.props?.name || '',
    },
    {
      name: 'user_props_surname',
      type: FormFieldType.text,
      label: 'editUser.surname',
      defaultValue: targetUser?.props?.surname || '',
    },
    {
      name: 'user_props_title',
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

  return { fields }
}

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Contacts } from 'meta/cycleData'
import { RoleName, User, Users } from 'meta/user'
import { UserRoleExtended } from 'meta/user/userRole'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'
import { EditUserRules } from 'client/pages/User/hooks/useEditUserRules'

type Props = {
  editUserRules: EditUserRules
  targetUser: User
}

export const useFormDefinition = (props: Props): FormDefinition => {
  const { editUserRules, targetUser } = props

  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()

  const { emailDisabled, rolePropsAvailable } = editUserRules

  return useMemo<FormDefinition>(() => {
    const fields: Array<FieldDefinition> = [
      {
        name: 'user.id',
        type: FormFieldType.hidden,
        label: '',
        defaultValue: targetUser?.id,
      },
      {
        name: 'user.uuid',
        type: FormFieldType.hidden,
        label: '',
        defaultValue: targetUser?.uuid,
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

    if (rolePropsAvailable) {
      const role = Users.getRole(targetUser, countryIso, cycle) as UserRoleExtended<RoleName>

      const roleFields: Array<FieldDefinition> = [
        {
          name: 'role.uuid',
          type: FormFieldType.hidden,
          label: '',
          defaultValue: role?.uuid || '',
        },
        {
          name: 'role.props.professionalTitle',
          type: FormFieldType.text,
          label: 'editUser.professionalTitle',
          defaultValue: role?.props?.professionalTitle || '',
        },
        {
          name: 'role.props.organizationalUnit',
          type: FormFieldType.text,
          label: 'editUser.organizationalUnit',
          defaultValue: role?.props?.organizationalUnit || '',
        },
        {
          name: 'role.props.organization',
          type: FormFieldType.text,
          label: 'editUser.organization',
          defaultValue: role?.props?.organization || '',
        },
        {
          name: 'role.props.address.street',
          type: FormFieldType.text,
          label: 'editUser.street',
          defaultValue: role?.props?.address?.street || '',
        },
        {
          name: 'role.props.address.zipCode',
          type: FormFieldType.text,
          label: 'editUser.zipCode',
          defaultValue: role?.props?.address?.zipCode || '',
        },
        {
          name: 'role.props.address.poBox',
          type: FormFieldType.text,
          label: 'editUser.poBox',
          defaultValue: role?.props?.address?.poBox || '',
        },
        {
          name: 'role.props.address.city',
          type: FormFieldType.text,
          label: 'editUser.city',
          defaultValue: role?.props?.address?.city || '',
        },
        {
          name: 'role.props.address.countryIso',
          type: FormFieldType.text,
          label: 'editUser.countryIso',
          defaultValue: role?.props?.address?.countryIso || '',
        },
        {
          name: 'role.props.secondaryEmail',
          type: FormFieldType.text,
          label: 'editUser.secondaryEmail',
          defaultValue: role?.props?.secondaryEmail || '',
        },
        {
          name: 'role.props.primaryPhoneNumber',
          type: FormFieldType.text,
          label: 'editUser.primaryPhoneNumber',
          defaultValue: role?.props?.primaryPhoneNumber || '',
        },
        {
          name: 'role.props.secondaryPhoneNumber',
          type: FormFieldType.text,
          label: 'editUser.secondaryPhoneNumber',
          defaultValue: role?.props?.secondaryPhoneNumber || '',
        },
        {
          name: 'role.props.skype',
          type: FormFieldType.text,
          label: 'editUser.skype',
          defaultValue: role?.props?.skype || '',
        },
        {
          name: 'role.props.contactPreference',
          type: FormFieldType.text,
          label: 'editUser.contactPreference',
          defaultValue: role?.props?.contactPreference || '',
        },
      ]

      fields.push(...roleFields)
    }

    return { fields }
  }, [countryIso, cycle, emailDisabled, rolePropsAvailable, t, targetUser])
}

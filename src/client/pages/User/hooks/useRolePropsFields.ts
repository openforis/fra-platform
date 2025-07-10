import { useMemo } from 'react'

import { RoleName, Users } from 'meta/user'
import { UserRoleExtended } from 'meta/user/userRole'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { FormDefinition, FormFieldType } from 'client/components/Form/types'
import { Props } from 'client/pages/User/hooks/props'

export const useRolePropsFields = (props: Props): FormDefinition['fields'] => {
  const { editUserRules, targetUser } = props

  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()

  return useMemo<FormDefinition['fields']>(() => {
    if (!editUserRules.rolePropsAvailable) return []

    const role = Users.getRole(targetUser, countryIso, cycle) as UserRoleExtended<RoleName>

    return [
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
  }, [countryIso, cycle, editUserRules.rolePropsAvailable, targetUser])
}

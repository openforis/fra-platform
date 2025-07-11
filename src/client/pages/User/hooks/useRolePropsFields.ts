import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { RoleName, Users } from 'meta/user'
import { UserContactPreferenceMethod, UserContactPreferencePhoneOption, UserRoleExtended } from 'meta/user/userRole'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { FormDefinition, FormFieldType } from 'client/components/Form/types'
import { Option } from 'client/components/Inputs/Select'
import { PropsFormDefinition } from 'client/pages/User/hooks/types'

export const useRolePropsFields = (props: PropsFormDefinition): FormDefinition['fields'] => {
  const { editUserRules, targetUser } = props

  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()

  const { rolePropsAvailable } = editUserRules

  return useMemo<FormDefinition['fields']>(() => {
    if (Objects.isNil(targetUser) || !rolePropsAvailable) return []

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
        type: FormFieldType.textLink,
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
        type: FormFieldType.country,
        label: 'editUser.countryIso',
        defaultValue: role?.props?.address?.countryIso || '',
        placeholder: '',
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
        name: 'role.props.contactPreference.method',
        type: FormFieldType.select,
        label: 'editUser.contactPreference',
        defaultValue: role?.props?.contactPreference?.method || '',
        options: Object.values(UserContactPreferenceMethod).map<Option>((value) => ({
          label: t(`editUser.${value}`),
          value,
        })),
      },
      {
        name: 'role.props.contactPreference.options.phone',
        type: FormFieldType.select,
        label: 'editUser.channel',
        defaultValue: role?.props?.contactPreference?.options?.phone || '',
        options: Object.values(UserContactPreferencePhoneOption).map<Option>((value) => ({ label: value, value })),
        shouldShow: (values) => {
          const contactPreference = Objects.getInPath(values, ['role', 'props', 'contactPreference', 'method'])

          return [
            UserContactPreferenceMethod.primaryPhoneNumber,
            UserContactPreferenceMethod.secondaryPhoneNumber,
          ].includes(contactPreference)
        },
      },
    ]
  }, [countryIso, cycle, rolePropsAvailable, t, targetUser])
}

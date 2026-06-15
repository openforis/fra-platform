import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { Authorizer } from 'meta/auth/authorizer'
import { UserEditCountryForm } from 'meta/form/userEdit/form'
import { RoleName } from 'meta/user/role/name'
import { UserContactPreferenceMethod, UserContactPreferencePhoneOption } from 'meta/user/role/props'
import { UserRoleExtended } from 'meta/user/role/role'
import { UserRoles } from 'meta/user/roles'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'
import { Objects } from 'utils/objects'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { FormDefinition, FormFieldType } from 'client/components/Form/types'
import { Option } from 'client/components/Inputs/Select'
import { PropsFormDefinition } from 'client/pages/User/hooks/types'

export const useRolePropsFields = (props: PropsFormDefinition): FormDefinition['fields'] => {
  const { countryIso: countryIsoProp, cycle: cycleProp, targetUser } = props

  const { t } = useTranslation()
  const countryRouteParams = useCountryRouteParams<CountryIso>()
  const countryIso = countryIsoProp ?? countryRouteParams.countryIso
  const cycleRoute = useCycle()
  const cycle = cycleProp ?? cycleRoute
  const user = useUser()

  return useMemo<FormDefinition['fields']>(() => {
    if (Objects.isNil(targetUser)) return []

    const isTargetUserAdmin = Users.isAdministrator(targetUser)
    const isCountryPage = Areas.isISOCountry(countryIso)
    const role = Users.getRole(targetUser, countryIso, cycle) as UserRoleExtended<RoleName>
    const rolesAllowedToEdit = Users.getRolesAllowedToEdit({ user, countryIso, cycle })

    const getTargetUserWithFormRole = (values?: UserEditCountryForm): User => {
      const target = { ...targetUser }
      if (values?.role && Object.hasOwn(values.role, 'role')) {
        target.roles = target.roles.map((role) => {
          const roleUpdate = { ...role }
          if (role.countryIso === countryIso && role.cycleUuid === cycle.uuid) {
            roleUpdate.role = values.role.role
          }
          return roleUpdate
        })
      }
      return target
    }
    const shouldShowRoleProps = (values?: UserEditCountryForm): boolean => {
      const target = getTargetUserWithFormRole(values)
      return isCountryPage && Authorizer.canEditUserRoleProps({ cycle, countryIso, target, user })
    }

    const shouldShowRoleName = (): boolean => {
      // If the target user is admin, don't show dropdown for the user role
      if (isTargetUserAdmin) return false
      return isCountryPage && Authorizer.canEditUserRoleName({ cycle, countryIso, target: targetUser, user })
    }

    const shouldShowPermissions = (values?: UserEditCountryForm): boolean => {
      const target = getTargetUserWithFormRole(values)
      return isCountryPage && Authorizer.canEditUserRolePermissions({ cycle, countryIso, target, user })
    }

    return [
      {
        name: 'role.uuid',
        type: FormFieldType.hidden,
        label: '',
        defaultValue: role?.uuid || '',
        shouldShow: (values: UserEditCountryForm): boolean => {
          return shouldShowRoleName() || shouldShowRoleProps(values) || shouldShowPermissions(values)
        },
      },
      {
        name: 'role.role',
        type: FormFieldType.select,
        label: 'editUser.role',
        defaultValue: role?.role || '',
        required: true,
        options: rolesAllowedToEdit.map<Option>((roleName) => {
          return { label: t(Users.getI18nRoleLabelKey(roleName)), value: roleName }
        }),
        shouldShow: shouldShowRoleName,
      },
      {
        name: 'role.props.professionalTitle',
        type: FormFieldType.text,
        label: 'editUser.professionalTitle',
        defaultValue: role?.props?.professionalTitle || '',
        shouldShow: shouldShowRoleProps,
      },
      {
        name: 'role.props.organizationalUnit',
        type: FormFieldType.text,
        label: 'editUser.organizationalUnit',
        defaultValue: role?.props?.organizationalUnit || '',
        shouldShow: shouldShowRoleProps,
      },
      {
        name: 'role.props.organization',
        type: FormFieldType.textLink,
        label: 'editUser.organization',
        defaultValue: role?.props?.organization || '',
        required: true,
        shouldShow: shouldShowRoleProps,
      },
      {
        name: 'role.props.address.street',
        type: FormFieldType.text,
        label: 'editUser.street',
        defaultValue: role?.props?.address?.street || '',
        shouldShow: shouldShowRoleProps,
        required: true,
      },
      {
        name: 'role.props.address.zipCode',
        type: FormFieldType.text,
        label: 'editUser.zipCode',
        defaultValue: role?.props?.address?.zipCode || '',
        shouldShow: shouldShowRoleProps,
        required: true,
      },
      {
        name: 'role.props.address.poBox',
        type: FormFieldType.text,
        label: 'editUser.poBox',
        defaultValue: role?.props?.address?.poBox || '',
        shouldShow: shouldShowRoleProps,
      },
      {
        name: 'role.props.address.city',
        type: FormFieldType.text,
        label: 'editUser.city',
        defaultValue: role?.props?.address?.city || '',
        shouldShow: shouldShowRoleProps,
        required: true,
      },
      {
        country: { allowAtlantis: false },
        name: 'role.props.address.countryIso',
        type: FormFieldType.country,
        label: 'editUser.countryIso',
        defaultValue: role?.props?.address?.countryIso || '',
        placeholder: '',
        shouldShow: shouldShowRoleProps,
        required: true,
      },
      {
        name: 'role.props.secondaryEmail',
        type: FormFieldType.text,
        label: 'editUser.secondaryEmail',
        defaultValue: role?.props?.secondaryEmail || '',
        shouldShow: shouldShowRoleProps,
      },
      {
        name: 'role.props.primaryPhoneNumber',
        type: FormFieldType.telephone,
        label: 'editUser.primaryPhoneNumber',
        defaultValue: role?.props?.primaryPhoneNumber || '',
        shouldShow: shouldShowRoleProps,
        required: true,
      },
      {
        name: 'role.props.secondaryPhoneNumber',
        type: FormFieldType.telephone,
        label: 'editUser.secondaryPhoneNumber',
        defaultValue: role?.props?.secondaryPhoneNumber || '',
        shouldShow: shouldShowRoleProps,
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
        shouldShow: shouldShowRoleProps,
        required: true,
      },
      {
        name: 'role.props.contactPreference.options.phone',
        type: FormFieldType.select,
        label: 'editUser.channel',
        defaultValue: role?.props?.contactPreference?.options?.phone || '',
        options: Object.values(UserContactPreferencePhoneOption).map<Option>((value) => ({ label: value, value })),
        shouldShow: (values): boolean => {
          const contactPreference = Objects.getInPath(values, ['role', 'props', 'contactPreference', 'method'])

          return [
            UserContactPreferenceMethod.primaryPhoneNumber,
            UserContactPreferenceMethod.secondaryPhoneNumber,
          ].includes(contactPreference)
        },
      },
      {
        name: 'role.permissions',
        type: FormFieldType.permissions,
        label: 'userManagement.permissions',
        shouldShow: shouldShowPermissions,
        required: true,
        defaultValue: Objects.isEmpty(role?.permissions)
          ? UserRoles.getDefaultCollaboratorPermissions()
          : role.permissions,
      },
    ]
  }, [countryIso, cycle, t, targetUser, user])
}

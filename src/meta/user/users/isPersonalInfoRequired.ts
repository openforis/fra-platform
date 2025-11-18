import { Objects } from 'utils/objects'
import { RegExps } from 'utils/regExps'

import { RoleName } from 'meta/user/role/name'
import {
  UserContactPreference,
  UserContactPreferenceMethod,
  UserRoleBaseProps,
  UserRoleExtendedProps,
} from 'meta/user/role/props'
import { UserRole } from 'meta/user/role/role'
import { User, UserProps } from 'meta/user/user'
import { isAdministrator } from 'meta/user/users/isRole'

export const isPersonalInfoRequired = (user: User, role: UserRole): boolean => {
  // If no user or user is administrator, not required to fill information
  if (!user || isAdministrator(user) || !role) return false

  // Only National Correspondant, Alternate NC, and Collaborator required to fill information
  const hasCorrectRole = [
    RoleName.NATIONAL_CORRESPONDENT,
    RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
    RoleName.COLLABORATOR,
  ].includes(role.role)

  const missingUserProperties = ['title', 'name', 'surname'].some((propName: keyof UserProps) =>
    Objects.isEmpty(user.props[propName])
  )

  const hasExtendedRoleProps = [RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT].includes(
    role.role
  )

  const roleBaseProps = ['organization']

  const roleExtendedProps = roleBaseProps.concat(['address', 'primaryPhoneNumber'])

  const validateAddress = (prop: any): boolean =>
    ['street', 'zipCode', 'city'].some((propName) => Objects.isEmpty(prop?.[propName]))

  const validateContactPreference = (prop: UserContactPreference): boolean => {
    return (
      ([UserContactPreferenceMethod.primaryPhoneNumber, UserContactPreferenceMethod.secondaryPhoneNumber].includes(
        prop?.method
      ) &&
        Objects.isEmpty(prop.options?.phone)) ||
      Objects.isEmpty(prop?.method)
    )
  }

  const validateExtendedProps = (prop: any, propName: string): boolean => {
    if (propName === 'address') return validateAddress(prop)
    if (propName === 'contactPreference') return validateContactPreference(prop)
    return Objects.isEmpty(prop)
  }

  const missingRoleProperties = hasExtendedRoleProps
    ? roleExtendedProps.some((prop: keyof UserRoleExtendedProps) =>
        validateExtendedProps((role.props as UserRoleExtendedProps)[prop], prop)
      )
    : roleBaseProps.some((prop: keyof UserRoleBaseProps) => Objects.isEmpty((role.props as UserRoleBaseProps)[prop]))

  return hasCorrectRole && (!RegExps.validEmail(user) || missingUserProperties || missingRoleProperties)
}

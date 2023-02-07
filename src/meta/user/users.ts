import { Objects } from '@utils/objects'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CountryIso } from '@meta/area'
import { Cycle } from '@meta/assessment'

import type { User, UserProps } from './user'
import { RoleName, UserContactPreference, UserRole, UserRoleBaseProps, UserRoleExtendedProps } from './userRole'
import { UserRoles } from './userRoles'

const isAdministrator = (user: User) => {
  return user?.roles?.some((role) => role?.role === RoleName.ADMINISTRATOR)
}

const getRole = (user: User, countryIso: CountryIso, cycle: Cycle): UserRole<RoleName, any> => {
  if (isAdministrator(user)) return user.roles[0]

  return user?.roles?.find(
    (userRole: UserRole<any>) => userRole?.countryIso === countryIso && userRole?.cycleUuid === cycle.uuid
  )
}

const isRole = (user: User, role: RoleName, countryIso: CountryIso, cycle: Cycle) =>
  Boolean(getRole(user, countryIso, cycle)?.role === role)

const isCollaborator = (user: User, countryIso: CountryIso, cycle: Cycle) =>
  isRole(user, RoleName.COLLABORATOR, countryIso, cycle)

const isReviewer = (user: User, countryIso: CountryIso, cycle: Cycle) =>
  isRole(user, RoleName.REVIEWER, countryIso, cycle)

const isNationalCorrespondent = (user: User, countryIso: CountryIso, cycle: Cycle) =>
  isRole(user, RoleName.NATIONAL_CORRESPONDENT, countryIso, cycle)

const isAlternateNationalCorrespondent = (user: User, countryIso: CountryIso, cycle: Cycle) =>
  isRole(user, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, countryIso, cycle)

const isViewer = (user: User, countryIso: CountryIso, cycle: Cycle) => isRole(user, RoleName.VIEWER, countryIso, cycle)

const hasEditorRole = (props: { user: User; countryIso: CountryIso; cycle: Cycle }): boolean => {
  const { countryIso, cycle, user } = props

  if (isAdministrator(user)) return true

  const role = getRole(user, countryIso, cycle)

  return role && role.role !== RoleName.VIEWER
}

const getRolesAllowedToEdit = (props: { user: User; countryIso: CountryIso; cycle: Cycle }): Array<RoleName> => {
  const { countryIso, cycle, user } = props
  if (isAdministrator(user)) {
    return [
      RoleName.REVIEWER,
      RoleName.NATIONAL_CORRESPONDENT,
      RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
      RoleName.COLLABORATOR,
      RoleName.VIEWER,
    ]
  }
  if (isNationalCorrespondent(user, countryIso, cycle) || isAlternateNationalCorrespondent(user, countryIso, cycle)) {
    return [RoleName.COLLABORATOR, RoleName.VIEWER]
  }
  return []
}

const getI18nRoleLabelKey = (role: RoleName | string): string =>
  role ? `user.roles.${role}` : UserRoles.noRole.labelKey

export const profilePictureUri = (userId: number) => ApiEndPoint.User.profilePicture(String(userId))

// max 1Mb
export const validProfilePicture = (file: File) => !file || file.size <= 1000000

// validation methods
export const validName = (props: Partial<UserProps>) => !Objects.isEmpty(props.name)
export const validRole = (user: Partial<User>) => !Objects.isEmpty(user.roles)

export const validEmail = (user: Partial<User>) => {
  // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const re = /.+@.+/
  return re.test(user.email)
}

export const validateFields = (user: User) => ({
  email: validEmail(user),
  name: validName(user.props),
})

export const validate = (user: User) => {
  const fields = validateFields(user)
  return {
    ...fields,
    isError: Object.values(fields).includes(false),
  }
}

const isPersonalInfoRequired = (user: User, role: UserRole<RoleName, any>) => {
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

  const roleBaseProps = ['professionalTitle', 'organizationalUnit', 'organization']

  const roleExtendedProps = roleBaseProps.concat([
    'primaryEmail',
    'secondaryEmail',
    'primaryPhoneNumber',
    'secondaryPhoneNumber',
    'skype',
  ])

  const validateAddress = (prop: any) =>
    ['street', 'zipCode', 'poBox', 'city', 'countryIso'].some((propName) => Objects.isEmpty(prop[propName]))

  const validateContactPreference = (prop: UserContactPreference) =>
    Objects.isEmpty(prop.method) && Objects.isEmpty(prop.options?.phone)

  const validateExtendedProps = (prop: any, propName: string) => {
    if (propName === 'address') return validateAddress(prop)
    if (propName === 'contactPreference') return validateContactPreference(prop)
    return Objects.isEmpty(prop)
  }

  const missingRoleProperties = hasExtendedRoleProps
    ? roleExtendedProps.some((prop: keyof UserRoleExtendedProps) => validateExtendedProps(role.props[prop], prop))
    : roleBaseProps.some((prop: keyof UserRoleBaseProps) => Objects.isEmpty(role.props[prop]))

  return hasCorrectRole && (!validEmail(user) || missingUserProperties || missingRoleProperties)
}

const getFullName = (user: User) => [user.props.name, user.props.surname].join(' ')

export const Users = {
  getRole,
  getFullName,

  isAdministrator,
  isAlternateNationalCorrespondent,
  isCollaborator,
  isNationalCorrespondent,
  isPersonalInfoRequired,
  isReviewer,
  isViewer,

  getRolesAllowedToEdit,
  getI18nRoleLabelKey,
  hasEditorRole,

  profilePictureUri,
  validProfilePicture,
  validName,
  validRole,
  validEmail,
  validateFields,
  validate,
}

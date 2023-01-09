import { Objects } from '@utils/objects'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CountryIso } from '@meta/area'
import { Cycle } from '@meta/assessment'

import type { User } from './user'
import { RoleName, UserRole } from './userRole'
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

  return role && role.name !== RoleName.VIEWER
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
export const validName = (user: Partial<User>) => !Objects.isEmpty(user.name)
export const validRole = (user: Partial<User>) => !Objects.isEmpty(user.roles)

export const validEmail = (user: Partial<User>) => {
  // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const re = /.+@.+/
  return re.test(user.email)
}

export const validateFields = (user: User) => ({
  name: validName(user),
  email: validEmail(user),
})

export const validate = (user: User) => {
  const fields = validateFields(user)
  return {
    ...fields,
    isError: Object.values(fields).includes(false),
  }
}

export const Users = {
  getRole,

  isAdministrator,
  isCollaborator,
  isReviewer,
  isNationalCorrespondent,
  isAlternateNationalCorrespondent,
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

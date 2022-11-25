import { Objects } from '@utils/objects'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CountryIso } from '@meta/area'

import type { User } from './user'
import { RoleName, UserRole } from './userRole'
import { UserRoles } from './userRoles'

const isRole = (user: User, role: RoleName) =>
  Boolean(user?.roles?.find((userRole: UserRole<any>) => userRole.role === role))

const isCountryRole = (user: User, role: RoleName, countryIso: CountryIso) =>
  Boolean(user?.roles?.find((userRole: UserRole<any>) => userRole.countryIso === countryIso && userRole.role === role))

const isAdministrator = (user: User) => isRole(user, RoleName.ADMINISTRATOR)
const isCollaborator = (user: User, countryIso: CountryIso) => isCountryRole(user, RoleName.COLLABORATOR, countryIso)
const isReviewer = (user: User, countryIso: CountryIso) => isCountryRole(user, RoleName.REVIEWER, countryIso)
const isNationalCorrespondent = (user: User, countryIso: CountryIso) =>
  isCountryRole(user, RoleName.NATIONAL_CORRESPONDENT, countryIso)
const isAlternateNationalCorrespondent = (user: User, countryIso: CountryIso) =>
  isCountryRole(user, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, countryIso)
const isViewer = (user: User, countryIso: CountryIso) => isCountryRole(user, RoleName.VIEWER, countryIso)

const getCountryRole = (user: User, countryIso: CountryIso): UserRole<RoleName, any> => {
  if (isAdministrator(user)) return user.roles[0]

  return user?.roles?.find((role) => role.countryIso === countryIso)
}

const getRolesAllowedToEdit = (props: { user: User; countryIso: CountryIso }): Array<RoleName> => {
  const { countryIso, user } = props
  if (isAdministrator(user)) {
    return [
      RoleName.REVIEWER,
      RoleName.NATIONAL_CORRESPONDENT,
      RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
      RoleName.COLLABORATOR,
      RoleName.VIEWER,
    ]
  }

  if (isNationalCorrespondent(user, countryIso) || isAlternateNationalCorrespondent(user, countryIso)) {
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
  getCountryRole,

  isAdministrator,
  isCollaborator,
  isReviewer,
  isNationalCorrespondent,
  isAlternateNationalCorrespondent,
  isViewer,

  getRolesAllowedToEdit,
  getI18nRoleLabelKey,

  profilePictureUri,
  validProfilePicture,
  validName,
  validRole,
  validEmail,
  validateFields,
  validate,
}

import { CountryIso } from '@meta/area'
import type { User } from './user'
import { RoleName, UserRole } from './userRole'

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

const getCountryRole = (user: User, countryIso: CountryIso) => {
  if (isAdministrator(user)) return user.roles[0]

  return user?.roles?.find((role) => role.countryIso === countryIso)
}

export const Users = {
  getCountryRole,

  isAdministrator,
  isCollaborator,
  isReviewer,
  isNationalCorrespondent,
  isAlternateNationalCorrespondent,
  isViewer,
}

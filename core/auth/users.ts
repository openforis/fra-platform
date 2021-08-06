import { User, UserRole } from '@core/auth/user'

import { Role } from './role'

const isAdministrator = (userInfo: User): boolean =>
  Boolean(userInfo.roles.find((userRole) => userRole.role === Role.administrator))

const getCountryRoles = (userInfo: User, countryIso: string): Array<UserRole> =>
  userInfo.roles.filter((role) => role.countryIso === countryIso)

const getCountryRole = (userInfo: User, countryIso: string): Role => {
  if (!userInfo) return Role.noRole

  if (isAdministrator(userInfo)) return Role.administrator

  const countryRoles = getCountryRoles(userInfo, countryIso)

  if (countryRoles.length === 0) return Role.noRole
  return countryRoles[0].role
}

const hasCountryRole = (userInfo: User, countryIso: string, role: Role): boolean =>
  getCountryRole(userInfo, countryIso) === role

// UTILITY
const isReviewer = (userInfo: User, countryIso: string): boolean =>
  isAdministrator(userInfo) || hasCountryRole(userInfo, countryIso, Role.reviewer)
const isNationalCorrespondent = (userInfo: User, countryIso: string): boolean =>
  hasCountryRole(userInfo, countryIso, Role.nationalCorrespondent)
const isAlternateNationalCorrespondent = (userInfo: User, countryIso: string): boolean =>
  hasCountryRole(userInfo, countryIso, Role.alternateNationalCorrespondent)
const isCollaborator = (userInfo: User, countryIso: string): boolean =>
  hasCountryRole(userInfo, countryIso, Role.collaborator)
const hasNoRole = (userInfo: User, countryIso: string): boolean => hasCountryRole(userInfo, countryIso, Role.noRole)

export const Users = {
  // getCountryRole,
  // hasCountryRole,

  isAdministrator,
  isReviewer,
  isNationalCorrespondent,
  isAlternateNationalCorrespondent,
  isCollaborator,
  hasNoRole,
}

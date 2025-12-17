import { AreaCode } from 'meta/area/areaCode'
import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'
import { RoleName } from 'meta/user/role/name'
import { UserRole } from 'meta/user/role/role'
import { User } from 'meta/user/user'
import { getRole } from 'meta/user/users/getRole'

export const isAdministrator = (user: User): boolean => {
  return user?.roles?.some((role) => role?.role === RoleName.ADMINISTRATOR)
}
const isRole = (user: User, role: RoleName, countryIso: AreaCode, cycle: Cycle): boolean =>
  Boolean(getRole(user, countryIso, cycle)?.role === role)

export const isCollaborator = (user: User, countryIso: CountryIso, cycle: Cycle): boolean =>
  isRole(user, RoleName.COLLABORATOR, countryIso, cycle)

export const isRegionalFocalPoint = (user: User, countryIso: AreaCode, cycle: Cycle): boolean =>
  isRole(user, RoleName.REGIONAL_FOCAL_POINT, countryIso, cycle)

export const isReviewer = (user: User, countryIso: AreaCode, cycle: Cycle): boolean =>
  isRole(user, RoleName.REVIEWER, countryIso, cycle)

export const isAReviewer = (user: User, cycle: Cycle): boolean => {
  return user?.roles?.some(
    (userRole: UserRole<never>) => userRole?.role === RoleName.REVIEWER && userRole?.cycleUuid === cycle.uuid
  )
}

export const isNationalCorrespondent = (user: User, countryIso: AreaCode, cycle: Cycle): boolean =>
  isRole(user, RoleName.NATIONAL_CORRESPONDENT, countryIso, cycle)

export const isAlternateNationalCorrespondent = (user: User, countryIso: AreaCode, cycle: Cycle): boolean =>
  isRole(user, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, countryIso, cycle)

export const isViewer = (user: User, countryIso: CountryIso, cycle: Cycle): boolean =>
  isRole(user, RoleName.VIEWER, countryIso, cycle)

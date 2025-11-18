import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { CountryStatus } from 'meta/area/countryStatus'
import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { areCanEditDataPropsValid } from 'meta/auth/authorizer/_canEditData/areCanEditDataPropsValid'
import { canCollaboratorEditData } from 'meta/auth/authorizer/_canEditData/canCollaboratorEditData'
import { CollaboratorEditPropertyType } from 'meta/user/role/collaborator'
import { RoleName } from 'meta/user/role/name'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

export type AuthProps = {
  country: Country
  cycle: Cycle
  permission?: CollaboratorEditPropertyType
  section?: Section | SubSection
  user: User
}

const allowedStatuses = [CountryStatus.notStarted, CountryStatus.editing, CountryStatus.review]

const allowedRolesWithoutPermissions = [
  RoleName.REVIEWER,
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
]

/**
 * CanViewReview - Determines if user can view review indicators for specific sections
 */
export const canViewReview = (props: AuthProps): boolean => {
  const { country, cycle, permission, section, user } = props
  if (areCanEditDataPropsValid({ country, cycle, user })) {
    const { countryIso } = country
    const status = Areas.getStatus(country)

    const isAdministrator = Users.isAdministrator(user)
    const isCollaborator = Users.isCollaborator(user, countryIso, cycle)
    const role = Users.getRole(user, countryIso, cycle)

    if (isAdministrator) return true

    if (allowedStatuses.includes(status)) {
      if (allowedRolesWithoutPermissions.includes(role.role)) {
        return true
      }
      if (isCollaborator) {
        return canCollaboratorEditData({ country, cycle, permission, section, user })
      }
    }
  }

  return false
}

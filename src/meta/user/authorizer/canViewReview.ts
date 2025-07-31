import { Areas, Country, CountryStatus } from 'meta/area'
import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { User } from 'meta/user/user'
import { CollaboratorEditPropertyType, RoleName } from 'meta/user/userRole'
import { Users } from 'meta/user/users'

import { areCanEditDataPropsValid } from './_canEditData/areCanEditDataPropsValid'
import { canCollaboratorEditData } from './_canEditData/canCollaboratorEditData'

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

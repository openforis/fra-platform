import { Areas, Country, CountryStatus } from 'meta/area'
import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { User } from 'meta/user/user'

import { Collaborator, CollaboratorEditPropertyType, RoleName } from '../userRole'
import { Users } from '../users'

export type AuthProps = {
  cycle: Cycle
  country: Country
  user: User
  section?: Section | SubSection
  permission?: CollaboratorEditPropertyType
}

const hasCollaboratorEditSectionPermission = (props: AuthProps) => {
  const { country, cycle, permission = CollaboratorEditPropertyType.tableData, section, user } = props
  const { countryIso } = country ?? {}

  const isCollaborator = Users.isCollaborator(user, countryIso, cycle)

  if (isCollaborator) {
    const userRole = Users.getRole(user, countryIso, cycle) as Collaborator

    const userPermissions = userRole.permissions?.[permission]
    if (!userPermissions || userPermissions.length === 0) return true
    if (userPermissions.includes('none')) return false
    if (userPermissions.includes('all')) return true
    return userPermissions.includes(section.uuid)
  }
  return true
}

const hasEditSectionPermission = (
  props: AuthProps & {
    countryStatus: { [key in RoleName]?: Array<CountryStatus> }
  }
): boolean => {
  const { country, countryStatus, cycle, user } = props
  const { countryIso } = country
  const status = Areas.getStatus(country)

  const userRole = Users.getRole(user, countryIso, cycle)

  return countryStatus[userRole?.role]?.includes(status) && hasCollaboratorEditSectionPermission(props)
}

/**
 * @param {AuthProps} props - Authorization properties
 * @returns {boolean} True if the user can view the review, false otherwise
 */
export const canViewReview = (props: AuthProps): boolean => {
  const { country, section, user } = props
  if (!country || !section || !user || !Areas.isISOCountry(country.countryIso)) return false

  // Selected roles can see only in edit statuses: not started, review and editing
  const allowedStatuses = [CountryStatus.notStarted, CountryStatus.review, CountryStatus.editing]

  const countryStatus = Object.fromEntries(
    [
      RoleName.REVIEWER,
      RoleName.NATIONAL_CORRESPONDENT,
      RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
      RoleName.COLLABORATOR,
    ].map((role) => [role, allowedStatuses])
  )

  // Admin can view in all statuses
  countryStatus[RoleName.ADMINISTRATOR] = Object.values(CountryStatus)

  return hasEditSectionPermission({ ...props, countryStatus })
}

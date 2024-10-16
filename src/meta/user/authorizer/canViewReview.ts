import { Objects } from 'utils/objects'

import { Areas, AssessmentStatus, Country } from 'meta/area'
import { Cycle, Section, SubSection } from 'meta/assessment'
import { User } from 'meta/user/user'

import { Collaborator, CollaboratorEditPropertyType, CollaboratorSectionsPermission, RoleName } from '../userRole'
import { Users } from '../users'

export type AuthProps = {
  cycle: Cycle
  country: Country
  user: User
  section?: Section | SubSection
  permission?: CollaboratorEditPropertyType
}

const hasCollaboratorEditSectionPermission = (props: AuthProps) => {
  const { section, user, country, cycle, permission = CollaboratorEditPropertyType.tableData } = props
  const { countryIso } = country ?? {}

  const isCollaborator = Users.isCollaborator(user, countryIso, cycle)

  if (isCollaborator) {
    const userRole = Users.getRole(user, countryIso, cycle) as Collaborator

    const userSections: CollaboratorSectionsPermission = userRole.permissions?.sections ?? {}
    if (Objects.isEmpty(userSections)) return true
    if (userSections === 'none') return false
    if (userSections === 'all') return true
    return userSections[section.uuid]?.[permission] === true
  }
  return true
}

const hasEditSectionPermission = (
  props: AuthProps & {
    countryStatus: { [key in RoleName]?: Array<AssessmentStatus> }
  }
): boolean => {
  const { country, cycle, user, countryStatus } = props
  const { countryIso } = country
  const { status } = country.props

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

  const allowedStatuses = [AssessmentStatus.review, AssessmentStatus.editing]
  const countryStatus = Object.fromEntries(
    [
      RoleName.ADMINISTRATOR,
      RoleName.REVIEWER,
      RoleName.NATIONAL_CORRESPONDENT,
      RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
      RoleName.COLLABORATOR,
    ].map((role) => [role, allowedStatuses])
  )

  return hasEditSectionPermission({ ...props, countryStatus })
}

import { Areas, Country, CountryStatus } from 'meta/area'
import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { User } from 'meta/user/user'
import { Collaborator, CollaboratorEditPropertyType, CollaboratorPermissionsNEW } from 'meta/user/userRole'
import { Users } from 'meta/user/users'

const _getAllowedStatuses = (
  allowedStatuses: Array<CountryStatus> | undefined,
  reviewer: boolean
): Array<CountryStatus> => {
  if (allowedStatuses) return allowedStatuses

  if (reviewer) {
    return [CountryStatus.notStarted, CountryStatus.editing, CountryStatus.review]
  }
  return [CountryStatus.notStarted, CountryStatus.editing]
}

const _collaboratorSectionPermissions = (
  collaboratorPermissions: CollaboratorPermissionsNEW,
  permission: CollaboratorEditPropertyType,
  section: Section | SubSection
) => {
  const userPermissions = collaboratorPermissions[permission]
  if (!userPermissions || userPermissions.length === 0) return true
  if (userPermissions.includes('none')) return false
  if (userPermissions.includes('all')) return true
  return userPermissions.includes(section.uuid)
}

export const canEditCycleData = (props: {
  cycle: Cycle
  country: Country
  user: User
  section?: Section | SubSection
  permission?: CollaboratorEditPropertyType
  allowedStatuses?: Array<CountryStatus>
}): boolean => {
  const { allowedStatuses, country, cycle, permission = CollaboratorEditPropertyType.tableData, section, user } = props
  const { countryIso } = country ?? {}
  const status = Areas.getStatus(country)

  if (!user) return false
  if (Users.isViewer(user, countryIso, cycle)) return false
  if (Users.isAdministrator(user)) return true

  const nationalCorrespondent = Users.isNationalCorrespondent(user, countryIso, cycle)
  const alternateNationalCorrespondent = Users.isAlternateNationalCorrespondent(user, countryIso, cycle)
  const collaborator = Users.isCollaborator(user, countryIso, cycle)
  const reviewer = Users.isReviewer(user, countryIso, cycle)

  const effectiveAllowedStatuses = _getAllowedStatuses(allowedStatuses, reviewer)

  if (nationalCorrespondent || alternateNationalCorrespondent) {
    return effectiveAllowedStatuses.includes(status)
  }

  if (collaborator) {
    // Check if country status allows action
    if (!effectiveAllowedStatuses.includes(status)) {
      return false
    }

    const userRole = Users.getRole(user, countryIso, cycle) as Collaborator
    const collaboratorPermissions = userRole?.permissions

    // If a section is provided, check section-level permissions
    if (section && collaboratorPermissions) {
      return _collaboratorSectionPermissions(collaboratorPermissions, permission, section)
    }

    // Otherwise, check general editing permissions (no 'none' in either permission type)
    const collaboratorCanEdit =
      !collaboratorPermissions?.tableData?.includes('none') && !collaboratorPermissions?.descriptions?.includes('none')
    return collaboratorCanEdit
  }

  if (reviewer) {
    return effectiveAllowedStatuses.includes(status)
  }

  return false
}

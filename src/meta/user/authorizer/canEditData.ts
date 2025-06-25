import { Areas, Country, CountryStatus } from 'meta/area'
import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { canEditCycleData } from 'meta/user/authorizer/canEditCycleData'
import { User } from 'meta/user/user'
import { Collaborator, CollaboratorEditPropertyType } from 'meta/user/userRole'
import { Users } from 'meta/user/users'

/**
 * CanEditData
 * Viewer or non loggedin user: never
 * Administrator: always
 * NationalCorrespondant and AlternateNationalCorrespondant:
 * if status is editing then true
 * Collaborator:
 * if status is editing then
 * if !props.sections then true
 * if props.sections === 'none' then false
 * if props.sections === 'all' then true
 * if props.sections.sectionUuid then true
 * Reviewer:
 * if status in status ('review','editing') then true
 * @param props
 * @param props.country
 * @param props.cycle
 * @param props.permission
 * @param props.section
 * @param props.user
 * @returns boolean
 */
export const canEditData = (props: {
  cycle: Cycle
  section: Section | SubSection
  country: Country
  user: User
  permission?: CollaboratorEditPropertyType
}): boolean => {
  const { country, cycle, permission = CollaboratorEditPropertyType.tableData, section, user } = props
  if (!country) return false
  const { countryIso } = country
  if (!Areas.isISOCountry(countryIso)) return false
  const status = Areas.getStatus(country)

  if (canEditCycleData({ cycle, country, user })) {
    return true
  }

  if (
    Users.isCollaborator(user, countryIso, cycle) &&
    [CountryStatus.notStarted, CountryStatus.editing].includes(status)
  ) {
    const userRole = Users.getRole(user, countryIso, cycle) as Collaborator

    const userPermissions = userRole.permissions?.[permission]
    if (!userPermissions || userPermissions.length === 0) return true
    if (userPermissions.includes('none')) return false
    if (userPermissions.includes('all')) return true
    return userPermissions.includes(section.uuid)
  }

  return false
}

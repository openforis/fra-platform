import { Objects } from 'utils/objects'

import { Areas, Country, CountryIso } from 'meta/area'
import { AssessmentStatus } from 'meta/area/country'
import { Cycle, Section, SubSection } from 'meta/assessment'
import { User } from 'meta/user/user'
import { Collaborator, CollaboratorEditPropertyType } from 'meta/user/userRole'
import { Users } from 'meta/user/users'

/**
 *  CanView
 *  if cycle is published, everyone can view
 *  if not, admin can view, any other logged user in whom have a role in that country for that cycle can view
 *  @param props
 *  @param props.countryIso
 *  @param props.cycle
 *  @param props.User
 *  @returns boolean
 */
const canView = (props: { countryIso: CountryIso; cycle: Cycle; user: User }): boolean => {
  const { countryIso, user, cycle } = props
  if (cycle.published) return true
  if (Users.isAdministrator(user)) return true
  if (Areas.isGlobal(countryIso) || Areas.isRegion(countryIso)) return false

  const userHasRoleForCountryInCycle = user?.roles.some((role) => {
    return role.countryIso === countryIso && role.cycleUuid === cycle.uuid
  })

  return userHasRoleForCountryInCycle
}

/**
 *  CanViewUsers
 *  Admin can view, any other logged user who have a role in that country for that cycle can view
 *  @param props
 *  @param props.countryIso
 *  @param props.cycle
 *  @param props.User
 *  @returns boolean
 */
const canViewUsers = (props: { countryIso: CountryIso; cycle: Cycle; user: User }): boolean => {
  const { countryIso, user, cycle } = props
  if (Users.isAdministrator(user)) return true
  if (Areas.isGlobal(countryIso) || Areas.isRegion(countryIso)) return false

  const userHasRoleForCountryInCycle = user?.roles.some((role) => {
    return role.countryIso === countryIso && role.cycleUuid === cycle.uuid
  })

  return userHasRoleForCountryInCycle
}

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
const canEditData = (props: {
  cycle: Cycle
  section: Section | SubSection
  country: Country
  user: User
  permission?: CollaboratorEditPropertyType
}): boolean => {
  const { country, cycle, permission = CollaboratorEditPropertyType.tableData, section, user } = props
  const { countryIso } = country
  const { status } = country.props

  if (!user) return false
  if (Users.isViewer(user, countryIso, cycle)) return false
  if (Users.isAdministrator(user)) return true

  if (Users.isNationalCorrespondent(user, countryIso, cycle) || Users.isAlternateNationalCorrespondent(user, countryIso, cycle))
    return status === AssessmentStatus.editing

  if (Users.isReviewer(user, countryIso, cycle)) {
    return [AssessmentStatus.editing, AssessmentStatus.review].includes(status)
  }

  if (Users.isCollaborator(user, countryIso, cycle) && status === AssessmentStatus.editing) {
    const userRole = Users.getRole(user, countryIso, cycle) as Collaborator

    const userSections = userRole.permissions?.sections ?? {}
    if (Objects.isEmpty(userSections)) return true
    if (userSections === 'none') return false
    if (userSections === 'all') return true
    return userSections[section.uuid]?.[permission] === true
  }

  return false
}

/**
 * CanEditCountryProps
 * Viewer or non loggedin user: never
 * Administrator: always
 * NationalCorrespondant and AlternateNationalCorrespondant:
 * if status is editing then true
 * Reviewer:
 * if status in status ('review','editing') then true
 * @param props
 * @param props.country
 * @param props.cycle
 * @param props.user
 * @returns boolean
 */
const canEditCountryProps = (props: { country: Country; cycle: Cycle; user: User }): boolean => {
  const { country, cycle, user } = props
  const { countryIso } = country
  const { status } = country.props

  if (!user) return false
  if (Users.isViewer(user, countryIso, cycle)) return false
  if (Users.isAdministrator(user)) return true

  if (Users.isNationalCorrespondent(user, countryIso, cycle) || Users.isAlternateNationalCorrespondent(user, countryIso, cycle))
    return status === AssessmentStatus.editing

  if (Users.isReviewer(user, countryIso, cycle)) {
    return [AssessmentStatus.editing, AssessmentStatus.review].includes(status)
  }

  return false
}

export const Authorizer = {
  canView,
  canViewUsers,
  canEditCountryProps,
  canEditData,
}

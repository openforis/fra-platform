import { Assessment, AssessmentStatus, CountryStatus, Cycle, Table } from '@meta/assessment'
import { User } from '@meta/user/user'
import { CountryIso } from '@meta/area'
import { Users } from '@meta/user/users'

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
const canView = (props: {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle
  table: Table
  user: User
}): boolean => {
  const { countryIso, user, cycle } = props
  if (cycle.published) return true
  if (Users.isAdministrator(user)) return true

  const userHasRoleForCountryInCycle = user?.roles.some((role) => {
    return role.countryIso === countryIso && role.cycleUuid === cycle.uuid
  })

  return userHasRoleForCountryInCycle
}

/**
 * CanEdit
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
 * @param props.assessment
 * @param props.countryIso
 * @param props.cycle
 * @param props.table
 * @param props.status
 * @param props.user
 * @returns boolean
 */
const canEdit = (props: {
  countryIso: CountryIso
  table: Table
  countryStatus: CountryStatus
  user: User
}): boolean => {
  const { table, user, countryIso, countryStatus } = props
  if (!user) return false
  if (Users.isViewer(user, countryIso)) return false
  if (Users.isAdministrator(user)) return true

  const { status } = countryStatus

  // CountryStatus == Editing
  // And role is NationalCorrespondent or AlternateNationalCorrespondent
  if (
    (Users.isNationalCorrespondent(user, countryIso) || Users.isAlternateNationalCorrespondent(user, countryIso)) &&
    status === AssessmentStatus.editing
  )
    return true

  if (Users.isCollaborator(user, countryIso)) {
    const userRole: any = Users.getCountryRole(user, countryIso)

    const userSections = userRole.props?.sections ?? {}
    if (!userSections) return true
    if (userSections === 'none') return false
    if (userSections === 'all') return true
    if (userSections.sectionUuid === table.tableSectionId) return true
  }

  if (Users.isReviewer(user, countryIso)) {
    return [AssessmentStatus.editing, AssessmentStatus.review].includes(status)
  }

  return false
}

export const Authorizer = {
  canView,
  canEdit,
}

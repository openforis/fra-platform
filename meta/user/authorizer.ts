import { Assessment, CountryStatus, Cycle, Table } from '@meta/assessment'
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
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  table: Table
  status: CountryStatus
  user: User
}): boolean => {}
export const Authorizer = {
  canView,
  canEdit,
}

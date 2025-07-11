import { AreaCode, Areas, Country, CountryIso, CountryStatus } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { Section, SubSection } from 'meta/assessment/section'
import { RepositoryItem } from 'meta/cycleData'
import { canEditUserRoleProps } from 'meta/user/authorizer/canEditUserRoleProps'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

import { canEditSectionData } from './canEditSectionData'
import { canEditSomeData } from './canEditSomeData'
import { canEditUser, canEditUserRoleName } from './canEditUser'
import { canViewReview } from './canViewReview'

/**
 *  CanView
 *  if country is published, everyone can view
 *  if cycle is published, everyone can view
 *  if not, admin can view, any other logged user in whom have a role in that country for that cycle can view
 *  @param props
 *  @param props.areaCode - used to handle regions
 *  @param props.country
 *  @param props.cycle
 *  @param props.User
 *  @returns boolean
 */
const canView = (props: {
  assessment: Assessment
  country?: Country
  cycle: Cycle
  areaCode: AreaCode
  user: User
}): boolean => {
  const { areaCode, assessment, country, cycle, user } = props

  // Country can be undefined when passed from middleware when countryIso: RegionCode
  if (country?.props.status === CountryStatus.published) return true
  if (Cycles.isPublished(cycle)) return true
  if (Users.isAdministrator(user)) return true
  // if global or region, user must have at least one role in that assessment
  if (Areas.isGlobal(areaCode) || Areas.isRegion(areaCode)) return Users.hasRoleInAssessment({ assessment, user })

  return Users.hasRoleInCountry({ user, countryIso: areaCode, cycle })
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
  const { countryIso, cycle, user } = props
  if (Users.isAdministrator(user)) return true
  if (Areas.isGlobal(countryIso) || Areas.isRegion(countryIso)) return false

  return Users.hasRoleInCountry({ user, countryIso, cycle })
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
const canEditCountryProps = (props: {
  allowCollaborator?: boolean
  country: Country
  cycle: Cycle
  user: User
}): boolean => {
  const { allowCollaborator = false, country, cycle, user } = props
  const { countryIso } = country
  const status = Areas.getStatus(country)

  if (!user) return false

  if (Users.isAdministrator(user)) return true

  if (
    Users.isNationalCorrespondent(user, countryIso, cycle) ||
    Users.isAlternateNationalCorrespondent(user, countryIso, cycle) ||
    (allowCollaborator && Users.isCollaborator(user, countryIso, cycle))
  )
    return [CountryStatus.notStarted, CountryStatus.editing].includes(status)

  if (Users.isReviewer(user, countryIso, cycle))
    return [CountryStatus.notStarted, CountryStatus.editing, CountryStatus.review].includes(status)

  return false
}

const canEditRepositoryItem = (props: { cycle: Cycle; country: Country; user: User }): boolean =>
  canEditCountryProps({ ...props, allowCollaborator: true })

const canViewRepositoryItem = (props: {
  assessment: Assessment
  cycle: Cycle
  country: Country
  areaCode: AreaCode
  user: User
  repositoryItem: RepositoryItem
}): boolean => {
  const { areaCode, assessment, country, cycle, repositoryItem, user } = props

  if (repositoryItem?.props?.public) {
    return canView({ assessment, cycle, country, areaCode, user })
  }

  return Users.hasRoleInCountry({ user, countryIso: areaCode, cycle })
}

/**
 * canViewHistory
 * Viewer or non loggedin user: never
 * Administrator: always
 * NationalCorrespondant and AlternateNationalCorrespondant: never
 * Collaborator: never
 * Reviewer: if country status <= review
 * @param props
 * @param props.country
 * @param props.cycle
 * @param props.section
 * @param props.user
 * @returns boolean
 */
const canViewHistory = (props: {
  country: Country
  cycle: Cycle
  section: Section | SubSection
  user: User
}): boolean => {
  const { country, cycle, user } = props

  if (Users.isAdministrator(user)) return true

  return Users.isReviewer(user, country.countryIso, cycle) && canEditSomeData(props)
}

/**
 * canViewHistoryLastApproved:
 * returns true if (user is admin or reviewer) and status !== notStarted
 */
const canViewHistoryLastApproved = (props: { country: Country; cycle: Cycle; user: User }): boolean => {
  const { country, cycle, user } = props

  const status = Areas.getStatus(country)

  return (
    (Users.isAdministrator(user) || Users.isReviewer(user, country?.countryIso, cycle)) &&
    status !== CountryStatus.notStarted
  )
}

export const canViewGeo = (props: { cycle: Cycle; countryIso: AreaCode; user: User }): boolean =>
  Users.hasRoleInCountry(props)

export const Authorizer = {
  canEditCountryProps,
  canEditRepositoryItem,
  canEditSectionData,
  canEditSomeData,
  canView,
  canViewGeo,
  canViewHistory,
  canViewHistoryLastApproved,
  canViewRepositoryItem,
  canViewReview,
  // user
  canEditUser,
  canEditUserRoleName,
  canEditUserRoleProps,
  canViewUsers,
}

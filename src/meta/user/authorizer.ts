import { Objects } from 'utils/objects'

import { AreaCode, Areas, AssessmentStatus, Country, CountryIso } from 'meta/area'
import { Assessment, Cycle, Cycles, Section, SubSection } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'
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
const canView = (props: { assessment: Assessment; countryIso: AreaCode; cycle: Cycle; user: User }): boolean => {
  const { assessment, countryIso, user, cycle } = props
  if (Cycles.isPublished(cycle)) return true
  if (Users.isAdministrator(user)) return true
  // if global or region, user must have at least one role in that assessment
  if (Areas.isGlobal(countryIso) || Areas.isRegion(countryIso)) return Users.hasRoleInAssessment({ assessment, user })

  return Users.hasRoleInCountry({ user, countryIso, cycle })
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

  return Users.hasRoleInCountry({ user, countryIso, cycle })
}

const canEditCycleData = (props: { cycle: Cycle; country: Country; user: User }): boolean => {
  const { cycle, country, user } = props
  const { countryIso } = country ?? {}
  const { status } = country?.props ?? {}

  if (!user) return false
  if (Users.isViewer(user, countryIso, cycle)) return false
  if (Users.isAdministrator(user)) return true

  const nationalCorrespondent = Users.isNationalCorrespondent(user, countryIso, cycle)
  const alternateNationalCorrespondent = Users.isAlternateNationalCorrespondent(user, countryIso, cycle)
  const collaborator = Users.isCollaborator(user, countryIso, cycle)
  const reviewer = Users.isReviewer(user, countryIso, cycle)

  if (nationalCorrespondent || alternateNationalCorrespondent || collaborator) {
    const collaboratorCanEdit = !collaborator || (user as unknown as Collaborator).permissions?.sections !== 'none'
    return status === AssessmentStatus.editing && collaboratorCanEdit
  }

  if (reviewer) {
    return [AssessmentStatus.editing, AssessmentStatus.review].includes(status)
  }

  return false
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
  if (!country) return false
  const { countryIso } = country
  if (!Areas.isISOCountry(countryIso)) return false
  const { status } = country.props

  if (canEditCycleData({ cycle, country, user })) {
    return true
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
const canEditCountryProps = (props: {
  allowCollaborator?: boolean
  country: Country
  cycle: Cycle
  user: User
}): boolean => {
  const { allowCollaborator = false, country, cycle, user } = props
  const { countryIso } = country
  const { status } = country.props

  if (!user) return false

  if (Users.isAdministrator(user)) return true

  if (
    Users.isNationalCorrespondent(user, countryIso, cycle) ||
    Users.isAlternateNationalCorrespondent(user, countryIso, cycle) ||
    (allowCollaborator && Users.isCollaborator(user, countryIso, cycle))
  )
    return status === AssessmentStatus.editing

  if (Users.isReviewer(user, countryIso, cycle))
    return [AssessmentStatus.editing, AssessmentStatus.review].includes(status)

  return false
}

const canEditRepositoryItem = (props: { cycle: Cycle; country: Country; user: User }): boolean =>
  canEditCountryProps({ ...props, allowCollaborator: true })

const canViewRepositoryItem = (props: {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  user: User
  repositoryItem: RepositoryItem
}): boolean => {
  const { assessment, countryIso, user, cycle, repositoryItem } = props

  if (repositoryItem?.props?.public) {
    return canView({ assessment, user, countryIso, cycle })
  }

  return Users.hasRoleInCountry({ user, countryIso, cycle })
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
  const { user, cycle, country } = props

  if (Users.isAdministrator(user)) return true

  return Users.isReviewer(user, country.countryIso, cycle) && canEditCycleData(props)
}

export const canViewGeo = (props: { cycle: Cycle; countryIso: AreaCode; user: User }): boolean =>
  Users.hasRoleInCountry(props)

export const Authorizer = {
  canEditCountryProps,
  canEditCycleData,
  canEditData,
  canEditRepositoryItem,
  canView,
  canViewGeo,
  canViewHistory,
  canViewRepositoryItem,
  canViewUsers,
}

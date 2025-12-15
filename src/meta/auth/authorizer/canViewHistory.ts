import { Country } from 'meta/area/country'
import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { canEditSomeData } from 'meta/auth/authorizer/canEditSomeData'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

type Props = {
  country: Country
  cycle: Cycle
  section: Section | SubSection
  user: User
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
export const canViewHistory = (props: Props): boolean => {
  const { country, cycle, user } = props

  if (Users.isAdministrator(user)) return true

  const isRegionalFocalPoint = Users.isRegionalFocalPoint(user, country.countryIso, cycle)
  const isReviewer = Users.isReviewer(user, country.countryIso, cycle)

  return (isRegionalFocalPoint || isReviewer) && canEditSomeData(props)
}

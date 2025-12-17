import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { CountryStatus } from 'meta/area/countryStatus'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

type Props = {
  allowCollaborator?: boolean
  country: Country
  cycle: Cycle
  user: User
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
export const canEditCountryProps = (props: Props): boolean => {
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

  if (Users.isRegionalFocalPoint(user, countryIso, cycle) || Users.isReviewer(user, countryIso, cycle))
    return [CountryStatus.notStarted, CountryStatus.editing, CountryStatus.review].includes(status)

  return false
}

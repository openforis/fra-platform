import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { CountryStatus } from 'meta/area/countryStatus'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

type Props = {
  country: Country
  cycle: Cycle
  user: User
}

/**
 * canViewHistoryLastApproved:
 * returns true if (user is admin or reviewer) and status !== notStarted
 */
export const canViewHistoryLastApproved = (props: Props): boolean => {
  const { country, cycle, user } = props

  const status = Areas.getStatus(country)

  const isAdmin = Users.isAdministrator(user)
  const isRegionalFocalPoint = Users.isRegionalFocalPoint(user, country?.countryIso, cycle)
  const isReviewer = Users.isReviewer(user, country?.countryIso, cycle)

  return (isAdmin || isRegionalFocalPoint || isReviewer) && status !== CountryStatus.notStarted
}

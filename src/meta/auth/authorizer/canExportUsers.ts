import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

/**
 *  CanExportUsers
 *  Admin and regional focal point can export user info
 *  @param props
 *  @param props.countryIso
 *  @param props.cycle
 *  @param props.user
 *  @returns boolean
 */
export const canExportUsers = (props: { countryIso: CountryIso; cycle: Cycle; user: User }): boolean => {
  const { countryIso, cycle, user } = props
  return Users.isAdministrator(user) || Users.isRegionalFocalPoint(user, countryIso, cycle)
}

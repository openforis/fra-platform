import { Areas, CountryIso } from 'meta/area'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

type Props = { countryIso: CountryIso; cycle: Cycle; user: User; target: User }

export const canEditUserRolePermissions = (props: Props) => {
  const { countryIso, cycle, target, user } = props

  const isAdministrator = Users.isAdministrator(user)
  const isNationalCorrespondent = Users.isNationalCorrespondent(user, countryIso, cycle)
  const isAlternateNationalCorrespondent = Users.isAlternateNationalCorrespondent(user, countryIso, cycle)

  const isTargetCollaborator = Users.isCollaborator(target, countryIso, cycle)
  const isISOCountry = Areas.isISOCountry(countryIso)

  return (
    isISOCountry &&
    (isAdministrator || isNationalCorrespondent || isAlternateNationalCorrespondent) &&
    isTargetCollaborator
  )
}

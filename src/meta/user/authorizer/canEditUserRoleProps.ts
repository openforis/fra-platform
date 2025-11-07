import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

type Props = { countryIso: CountryIso; cycle: Cycle; user: User; target: User }

export const canEditUserRoleProps = (props: Props): boolean => {
  const { countryIso, cycle, target, user } = props

  const isAdministrator = Users.isAdministrator(user)
  const isSelf = user.id === target.id

  const isTargetCollaborator = Users.isCollaborator(target, countryIso, cycle)
  const isTargetNationalCorrespondent = Users.isNationalCorrespondent(target, countryIso, cycle)
  const isTargetAlternateNationalCorrespondent = Users.isAlternateNationalCorrespondent(target, countryIso, cycle)

  const isISOCountry = Areas.isISOCountry(countryIso)

  const targetUserHasRoleProps =
    isTargetAlternateNationalCorrespondent || isTargetCollaborator || isTargetNationalCorrespondent

  return isISOCountry && (isAdministrator || isSelf) && targetUserHasRoleProps
}

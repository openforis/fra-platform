import { AreaCode } from 'meta/area/areaCode'
import { Areas } from 'meta/area/areas'
import { Cycle } from 'meta/assessment/cycle'
import { RoleName } from 'meta/user/role/name'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'
import { Objects } from 'utils/objects'

type Props = { countryIso?: AreaCode; cycle: Cycle; user: User; target: User }

export const rfpDisableableRoles = [
  RoleName.REVIEWER,
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.COLLABORATOR,
  RoleName.VIEWER,
]

// User can disable another user if:
//   - The user is admin
//   - The user is RFC and the target has one of rfpDisableableRoles
export const canDisableUser = ({ countryIso, cycle, target, user }: Props): boolean => {
  if (Users.isAdministrator(user)) return true
  if (user.id === target.id) return false
  if (Objects.isEmpty(countryIso) || !Areas.isISOCountry(countryIso)) return false
  if (!Users.isRegionalFocalPoint(user, countryIso, cycle)) return false
  return rfpDisableableRoles.includes(Users.getRole(target, countryIso, cycle)?.role)
}

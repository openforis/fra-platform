import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

type Props = { countryIso: CountryIso; cycle: Cycle; user: User; target: User }

export const canEditUserRoleName = (props: Props): boolean => {
  const { countryIso, cycle, target, user } = props

  if (Users.isAdministrator(user)) return true
  if (user.id === target.id) return false

  const rolesAllowedToEdit = Users.getRolesAllowedToEdit({ user, countryIso, cycle })
  return rolesAllowedToEdit.includes(Users.getRole(target, countryIso, cycle)?.role)
}

export const canEditUser = (props: Props): boolean => {
  const { target, user } = props

  if (Users.isAdministrator(user)) return true
  if (user.id === target.id) return true

  return canEditUserRoleName(props)
}

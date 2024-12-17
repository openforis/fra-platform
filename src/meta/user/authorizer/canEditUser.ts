import { CountryIso } from 'meta/area'
import { Cycle } from 'meta/assessment'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

type Props = { countryIso: CountryIso; cycle: Cycle; user: User; target: User }

export const canEditUserRole = (props: Props) => {
  const { countryIso, cycle, user, target } = props

  if (Users.isAdministrator(user)) return true
  if (user.id === target.id) return false

  const rolesAllowedToEdit = Users.getRolesAllowedToEdit({ user, countryIso, cycle })
  return rolesAllowedToEdit.includes(Users.getRole(target, countryIso, cycle)?.role)
}

export const canEditUser = (props: Props) => {
  const { user, target } = props

  if (Users.isAdministrator(user)) return true
  if (user.id === target.id) return true

  return canEditUserRole(props)
}

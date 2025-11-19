import { Cycle } from 'meta/assessment/cycle'
import { UserRole } from 'meta/user/role/role'
import { User } from 'meta/user/user'

export const getCycleRoles = (props: { cycle: Cycle; user: User }): Array<UserRole> => {
  const { cycle, user } = props
  return user?.roles.filter((role) => role.cycleUuid === cycle.uuid) ?? []
}

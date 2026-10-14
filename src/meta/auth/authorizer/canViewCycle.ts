import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

type Props = {
  cycle: Cycle
  user: User
}
/**
 *  CanViewCycle
 *  if cycle is published, everyone can view
 *  if not, admin can view, any other logged user who has a role in that cycle can view
 *  Usage: Cycle scoped data e.g. sections
 *  @param props
 *  @param props.cycle
 *  @param props.user
 *  @returns boolean
 */
export const canViewCycle = (props: Props): boolean => {
  const { cycle, user } = props

  if (Cycles.isPublished(cycle)) return true
  if (Users.isAdministrator(user)) return true

  return Users.hasRoleInCycle({ user, cycle })
}

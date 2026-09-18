import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

type Props = {
  cycle: Cycle
  user: User
}
/**
 *  CanViewCycleData
 *  if cycle is published, everyone can view
 *  if not, only admin can view
 *  @param props
 *  @param props.cycle
 *  @param props.user
 *  @returns boolean
 */
export const canViewCycleData = (props: Props): boolean => {
  const { cycle, user } = props

  if (Users.isAdministrator(user)) return true
  return Cycles.isPublished(cycle)
}

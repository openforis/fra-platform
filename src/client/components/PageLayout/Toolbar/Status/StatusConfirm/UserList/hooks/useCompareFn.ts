import { useMemo } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'
import { RoleName, User, Users } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/routeParams'

const approvalRolesOrder: Partial<Record<RoleName, number>> = {
  [RoleName.ADMINISTRATOR]: 0,
  [RoleName.REVIEWER]: 1,
  [RoleName.NATIONAL_CORRESPONDENT]: 2,
  [RoleName.ALTERNATE_NATIONAL_CORRESPONDENT]: 3,
  [RoleName.COLLABORATOR]: 4,
}

const getApprovalRoleOrder = (props: { user: User; countryIso: CountryIso; cycle: Cycle }): number => {
  const { countryIso, cycle, user } = props
  const role = Users.getRole(user, countryIso, cycle)?.role
  const rolesOrderLength = Object.keys(approvalRolesOrder).length
  if (role !== undefined) return approvalRolesOrder[role as RoleName] ?? rolesOrderLength

  return rolesOrderLength
}

const approvalStatusSort = (props: { userA: User; userB: User; countryIso: CountryIso; cycle: Cycle }): number => {
  const { userA, userB, ...rest } = props
  const roleOrderA = getApprovalRoleOrder({ user: userA, ...rest })
  const roleOrderB = getApprovalRoleOrder({ user: userB, ...rest })
  if (roleOrderA !== roleOrderB) return roleOrderA - roleOrderB

  return userA.props?.name?.localeCompare(userB.props?.name) || 0
}

export const useCompareFn = (): Parameters<typeof Array.prototype.sort>[0] => {
  const cycle = useCycle()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  return useMemo(
    () => (userA: User, userB: User) => {
      return approvalStatusSort({ userA, userB, countryIso, cycle })
    },
    [countryIso, cycle]
  )
}

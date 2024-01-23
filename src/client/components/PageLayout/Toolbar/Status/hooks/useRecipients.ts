import { useMemo } from 'react'

import { AssessmentStatus, CountryIso } from 'meta/area'
import { RoleName, User, Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useCycle } from 'client/store/assessment'
import { useUsers } from 'client/store/ui/userManagement'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { StatusTransition } from 'client/components/PageLayout/Toolbar/Status/types'

const approvalRolesOrder: Partial<Record<RoleName, number>> = {
  [RoleName.ADMINISTRATOR]: 0,
  [RoleName.REVIEWER]: 1,
}

type Props = {
  status: StatusTransition
}

type Returned = Array<User>

export const useRecipients = (props: Props): Returned => {
  const { status } = props
  const users = useUsers()
  const currentUser = useUser()
  const cycle = useCycle()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  return useMemo<Returned>(() => {
    const recipientRoles = UserRoles.getRecipientRoles(status)
    const userList = users.filter((user) => {
      const userCountryRole = Users.getRole(user, countryIso, cycle)?.role
      return currentUser.id !== user.id && recipientRoles.includes(userCountryRole)
    })

    if (status.status !== AssessmentStatus.approval) return userList

    const getApprovalRoleOrder = (user: User): number => {
      const role = Users.getRole(user, countryIso, cycle)?.role
      const rolesOrderLength = Object.keys(approvalRolesOrder).length
      if (role !== undefined) return approvalRolesOrder[role as RoleName] ?? rolesOrderLength

      return rolesOrderLength
    }
    const approvalStatusSort = (userA: User, userB: User): number => {
      const roleOrderA = getApprovalRoleOrder(userA)
      const roleOrderB = getApprovalRoleOrder(userB)
      if (roleOrderA !== roleOrderB) return roleOrderA - roleOrderB

      return userA.props?.name?.localeCompare(userB.props?.name) || 0
    }

    return userList.sort(approvalStatusSort)
  }, [countryIso, currentUser, cycle, status, users])
}

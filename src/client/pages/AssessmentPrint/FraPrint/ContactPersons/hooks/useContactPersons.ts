import { useMemo } from 'react'

import { CollaboratorPermissions, RoleName, Users, UserStatus } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUsers } from 'client/store/ui/userManagement'
import { useCountryIso } from 'client/hooks'

export const useContactPersons = () => {
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const users = useUsers()
  return useMemo(
    () =>
      users.filter((user) => {
        const allowedRoleNames = [
          RoleName.COLLABORATOR,
          RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
          RoleName.NATIONAL_CORRESPONDENT,
        ]

        const userRole = Users.getRole(user, countryIso, cycle)
        const hasActiveStatus = [UserStatus.active, UserStatus.invitationPending].includes(user.status)
        const hasAllowedRoleName = allowedRoleNames.includes(userRole.role)
        const hasAllowedSections =
          userRole.role !== RoleName.COLLABORATOR || (userRole.props as CollaboratorPermissions)?.sections !== 'none'
        return hasActiveStatus && hasAllowedRoleName && hasAllowedSections
      }),
    [users, countryIso, cycle]
  )
}

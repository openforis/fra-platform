import { useMemo } from 'react'

import { User, Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useCycle } from 'client/store/assessment'
import { useUsers } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useMessageBoardUsers = (): Array<User> => {
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const users = useUsers()

  return useMemo<Array<User>>(
    () =>
      users.filter((user) => {
        const role = Users.getRole(user, countryIso, cycle)
        if (!role) return false
        return !(Users.isAdministrator(user) || UserRoles.isInvitationPending(role))
      }),
    [countryIso, cycle, users]
  )
}

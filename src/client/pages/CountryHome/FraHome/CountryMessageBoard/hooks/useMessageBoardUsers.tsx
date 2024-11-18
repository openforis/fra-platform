import { useMemo } from 'react'

import { CountryUserSummary, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUsers } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useMessageBoardUsers = (): Array<CountryUserSummary> => {
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const users = useUsers()

  return useMemo<Array<CountryUserSummary>>(
    () =>
      users.filter((user) => {
        const role = Users.getRole(user, countryIso, cycle)
        if (!role) return false
        return !Users.isAdministrator(user)
      }),
    [countryIso, cycle, users]
  )
}

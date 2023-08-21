import { useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { User, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

// If the user is reviewer:
// - filter the users to only show those that are accepted and that the current user has access to
// If the user is not reviewer:
// - show all users

export const useUserListUsers = (users: Array<User>) => {
  const { countryIso } = useCountryRouteParams()
  const currentUser = useUser()
  const cycle = useCycle()

  return useMemo(() => {
    if (Users.isReviewer(currentUser, countryIso as CountryIso, cycle)) {
      return users.filter((user) => {
        const userCountryRole = Users.getRole(user, countryIso as CountryIso, cycle)
        return (
          userCountryRole.acceptedAt &&
          Users.getRolesAllowedToView({ user: currentUser, countryIso: countryIso as CountryIso, cycle }).includes(
            userCountryRole.role
          )
        )
      })
    }
    return users
  }, [countryIso, currentUser, cycle, users])
}

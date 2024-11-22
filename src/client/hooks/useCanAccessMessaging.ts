import { User, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

/**
 * React hook to determine whether given user has access to the platforms messaging functionality
 *
 * @param user - The user
 * @returns boolean indicating whether the user can access messaging features
 *
 * @example
 * const user = useUser();
 * const canAccessMessaging = useCanAccessMessaging(user);
 *
 * if (!canAccessMessaging) {
 *   // Hide messaging UI
 * }
 */
export const useCanAccessMessaging = (user: User) => {
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()

  const rolesAllowedToView = Users.getRolesAllowedToView({ user, countryIso, cycle })

  return rolesAllowedToView.length > 0
}

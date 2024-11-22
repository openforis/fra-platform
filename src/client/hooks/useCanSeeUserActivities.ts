import { User, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

/**
 * React hook to determine whether given user has access to view user activities (eg. Messaging, Recent activity, etc.)
 *
 * @param user - The user
 * @returns boolean indicating whether the user can view user activities
 *
 * @example
 * const user = useUser();
 * const canSeeActivities = useCanSeeUserActivities(user);
 *
 * if (!canSeeActivities) {
 *   // Hide activities UI
 * }
 */
export const useCanSeeUserActivities = (user: User) => {
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()

  const rolesAllowedToView = Users.getRolesAllowedToView({ user, countryIso, cycle })

  return rolesAllowedToView.length > 0
}

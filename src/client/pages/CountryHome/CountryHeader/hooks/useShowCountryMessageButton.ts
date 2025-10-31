import { Areas } from 'meta/area/areas'

import { useCanSeeUserActivities } from 'client/store/user/hooks/auth'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useShowCountryMessageButton = (): boolean => {
  const user = useUser()
  const canSeeUserActivities = useCanSeeUserActivities(user)

  const { countryIso } = useCountryRouteParams()

  return Areas.isISOCountry(countryIso) && canSeeUserActivities
}

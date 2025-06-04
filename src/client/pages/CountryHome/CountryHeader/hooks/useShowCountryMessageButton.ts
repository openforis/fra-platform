import { Areas } from 'meta/area'

import { useCanSeeUserActivities } from 'client/store/user'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useShowCountryMessageButton = (): boolean => {
  const user = useUser()
  const canSeeUserActivities = useCanSeeUserActivities(user)

  const { countryIso } = useCountryRouteParams()

  return Areas.isISOCountry(countryIso) && canSeeUserActivities
}

import { useMemo } from 'react'

import { Areas, AssessmentStatus, CountryIso } from 'meta/area'
import { Users } from 'meta/user'

import { useCountry } from 'client/store/area'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useIsEnabled = (enabled: boolean): boolean => {
  const { countryIso } = useCountryRouteParams<CountryIso>()

  const country = useCountry(countryIso)
  const user = useUser()
  const isAdmin = Users.isAdministrator(user)

  return useMemo<boolean>(() => {
    return enabled && (isAdmin || Areas.getStatus(country) === AssessmentStatus.editing)
  }, [enabled, isAdmin, country])
}

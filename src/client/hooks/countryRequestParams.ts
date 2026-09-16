import { useMemo } from 'react'

import { CycleParams } from 'meta/api/request/cycle'
import { CountryIso } from 'meta/area/countryIso'
import { Users } from 'meta/user/users'

import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Params = CycleParams & { countryIso?: CountryIso }

// omit countryIso for admins - they have no roles to check countryIso for
export const useCountryRequestParams = (): Params => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const currentUser = useUser()

  return useMemo(() => {
    const params: Params = { assessmentName, cycleName }
    if (!Users.isAdministrator(currentUser)) {
      params.countryIso = countryIso
    }
    return params
  }, [assessmentName, countryIso, currentUser, cycleName])
}

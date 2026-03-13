import { CountryIso } from 'meta/area/countryIso'
import { Authorizer } from 'meta/auth/authorizer'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useCanExport = (): boolean => {
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const user = useUser()
  const cycle = useCycle()

  return Authorizer.canExportUsers({ countryIso, cycle, user })
}

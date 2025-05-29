import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { Areas, CountryIso } from 'meta/area'
import { Users } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/index'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useUserHasRoleInCountry = (): boolean => {
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const user = useUser()
  const cycle = useCycle()
  const isCountry = Areas.isISOCountry(countryIso)

  return useMemo<boolean>(() => {
    return !Objects.isNil(user) && isCountry && Users.hasRoleInCountry({ countryIso, cycle, user })
  }, [countryIso, cycle, isCountry, user])
}

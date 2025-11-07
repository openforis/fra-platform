import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { Users } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/routeParams'

import { useUser } from './user'

export const useUserHasRoleInCountry = (): boolean => {
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const user = useUser()
  const cycle = useCycle()
  const isCountry = Areas.isISOCountry(countryIso)

  return useMemo<boolean>(() => {
    return !Objects.isNil(user) && isCountry && Users.hasRoleInCountry({ countryIso, cycle, user })
  }, [countryIso, cycle, isCountry, user])
}

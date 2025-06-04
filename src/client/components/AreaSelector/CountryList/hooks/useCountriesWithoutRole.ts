import { useMemo } from 'react'

import { Areas, CountryIso } from 'meta/area'
import { Cycles } from 'meta/assessment/cycles'

import { useCountries } from 'client/store/area/hooks/countries'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser, useUserCountries } from 'client/store/user'

export const useCountriesWithoutRole = (): Array<CountryIso> => {
  const cycle = useCycle()
  const user = useUser()

  const _userCountries = useUserCountries()
  const allCountries = useCountries()

  return useMemo(() => {
    const isCyclePublished = Cycles.isPublished(cycle)
    const allCountryISOs = allCountries.map(({ countryIso }) => countryIso)

    // For unpublished cycles, return user's countries if user is logged in
    if (user && !isCyclePublished) {
      return _userCountries
    }

    // For published cycles or no user, return all countries except Atlantis
    return allCountryISOs.filter((countryIso) => !Areas.isAtlantis(countryIso))
  }, [_userCountries, allCountries, cycle, user])
}

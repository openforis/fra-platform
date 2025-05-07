import { useMemo } from 'react'

import { Areas, CountryIso } from 'meta/area'

import { useCountries } from 'client/store/area'
import { useUser, useUserCountries } from 'client/store/user'

export const useCountriesWithoutRole = (userCountries: boolean): Array<CountryIso> => {
  const user = useUser()

  const _userCountries = useUserCountries()
  const allCountries = useCountries()
  return useMemo(() => {
    if (userCountries && user) {
      return _userCountries
    }
    if (userCountries && !user) {
      return allCountries.map(({ countryIso }) => countryIso).filter((countryIso) => !Areas.isAtlantis(countryIso))
    }

    return allCountries.map(({ countryIso }) => countryIso)
  }, [_userCountries, allCountries, user, userCountries])
}

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { RegionCode } from 'meta/area/regionCode'

import { useCountries } from 'client/store/area/hooks/countries'
import { useGlobalCountries } from 'client/store/ui/countryReport/hooks/globalCountries'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useAllowedCountries = (): Array<CountryIso> | undefined => {
  const { countryIso } = useCountryRouteParams()
  const countries = useCountries()
  const homeCountriesFilter = useGlobalCountries()

  if (Areas.isGlobal(countryIso) && homeCountriesFilter?.length > 0) {
    return homeCountriesFilter
  }

  if (Areas.isRegion(countryIso)) {
    return countries.reduce<Array<CountryIso>>((acc, country) => {
      if (country.regionCodes.includes(countryIso as RegionCode)) {
        acc.push(country.countryIso)
      }
      return acc
    }, [])
  }

  return undefined
}

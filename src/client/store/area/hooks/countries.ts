import { useMemo } from 'react'

import { Areas, Country, CountryIso } from 'meta/area'

import { AreaSelectors } from 'client/store/area/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useLanguage } from 'client/hooks/language'
import { useCycleRouteParams } from 'client/hooks/routeParams'

export const useCountriesRecord = (): Record<CountryIso, Country> => {
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useAppSelector((state) => AreaSelectors.getCountries(state, assessmentName, cycleName))
}

export const useCountries = (): Array<Country> => {
  const countries = useCountriesRecord()
  const lang = useLanguage()

  return useMemo(() => {
    const countryValues = Object.values(countries)
    const compareFn = (c1: Country, c2: Country): number => Areas.getCompareListName(c1, c2, lang)
    return countryValues.sort(compareFn)
  }, [countries, lang])
}

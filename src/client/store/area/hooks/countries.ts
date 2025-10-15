import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas, Country, CountryIso } from 'meta/area'

import { AreaSelectors } from 'client/store/area/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCycleRouteParams } from 'client/hooks/routeParams'

export const useCountriesRecord = (): Record<CountryIso, Country> => {
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useAppSelector((state) => AreaSelectors.getCountries(state, assessmentName, cycleName))
}

export const useCountries = (): Array<Country> => {
  const countries = useCountriesRecord()
  const { i18n } = useTranslation()
  const compareListName = Areas.getCompareListName(i18n)

  return useMemo(() => {
    const countryValues = Object.values(countries)
    const compareFn = (c1: Country, c2: Country) => compareListName(c1.countryIso, c2.countryIso)
    return countryValues.sort(compareFn)
  }, [compareListName, countries])
}

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas, Country } from 'meta/area'

import { AreaSelectors } from 'client/store/area/selectors'
import { useAppSelector } from 'client/store/store'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useCountries = (): Array<Country> => {
  const { assessmentName, cycleName } = useCycleRouteParams()

  const countries = useAppSelector((state) => AreaSelectors.getCountries(state, assessmentName, cycleName))
  const { i18n } = useTranslation()
  const compareListName = Areas.getCompareListName(i18n)

  return useMemo(() => {
    const countryValues = Object.values(countries)
    const compareFn = (c1: Country, c2: Country) => compareListName(c1.countryIso, c2.countryIso)
    return countryValues.sort(compareFn)
  }, [compareListName, countries])
}

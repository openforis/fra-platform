import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { i18n } from 'i18next'
import { Strings } from 'utils/strings'

import { Country } from 'meta/area'

import { AreaSelectors } from 'client/store/area/selectors'
import { useAppSelector } from 'client/store/store'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

const getLocale = (isoCode: string): string => {
  if (isoCode.includes('zh')) return 'zh-CN'
  return isoCode
}

const getListName = (isoCode: string, i18n: i18n): string => i18n.t(`area.${isoCode}.listName`)

type CompareFn = (isoCode1: string, isoCode2: string) => number
const getCompareListName =
  (i18n: i18n): CompareFn =>
  (isoCode1: string, isoCode2: string): number => {
    const country1 = Strings.normalize(getListName(isoCode1, i18n))
    const country2 = Strings.normalize(getListName(isoCode2, i18n))
    const locale = getLocale(i18n.resolvedLanguage)
    return country1.localeCompare(country2, locale)
  }

export const useCountries = (): Array<Country> => {
  const { assessmentName, cycleName } = useCycleRouteParams()

  const countries = useAppSelector((state) => AreaSelectors.getCountries(state, assessmentName, cycleName))
  const { i18n } = useTranslation()
  const compareListName = getCompareListName(i18n)

  return useMemo(() => {
    const countryValues = Object.values(countries)
    const compareFn = (c1: Country, c2: Country) => compareListName(c1.countryIso, c2.countryIso)
    return countryValues.sort(compareFn)
  }, [countries, compareListName])
}

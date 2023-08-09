import { useTranslation } from 'react-i18next'

import { Strings } from 'utils/strings'

import { Country, CountryIso, RegionGroup } from 'meta/area'

import { useAppSelector } from 'client/store'
import { useCountryIso } from 'client/hooks'

// TODO: Move elsewhere <>
const getLocale = (isoCode: string): string => {
  if (isoCode.includes('zh')) return 'zh-CN'
  return isoCode
}
const getListName = (isoCode: string, i18n: any): string => i18n.t(`area.${isoCode}.listName`)

type CompareFn = (isoCode1: string, isoCode2: string) => number
const getCompareListName =
  (i18n: any): CompareFn =>
  (isoCode1: string, isoCode2: string): number => {
    const country1 = Strings.normalize(getListName(isoCode1, i18n))
    const country2 = Strings.normalize(getListName(isoCode2, i18n))
    const locale = getLocale(i18n.language)
    return country1.localeCompare(country2, locale)
  }

// </>

export const useCountries = (): Array<Country> => {
  const countries = useAppSelector((state) => state.assessment.countries ?? {}) as Record<CountryIso, Country>
  const { i18n } = useTranslation()
  const compareListName = getCompareListName(i18n)

  return Object.values(countries).sort((c1, c2) => compareListName(c1.countryIso, c2.countryIso))
}

export const useCountry = (countryIso: CountryIso): Country =>
  useAppSelector((state) => state.assessment.countries?.[countryIso])

export const useAssessmentCountry = (): Country => {
  const countryIso = useCountryIso()
  if (!countryIso) throw new Error(`Unable to find countryIso parameter`)
  return useCountry(countryIso)
}

export const useRegionGroups = (): Record<string, RegionGroup> =>
  useAppSelector((state) => state.assessment?.regionGroups ?? {})

export const useSecondaryRegion = () => {
  const regionGroups = useRegionGroups()
  return Object.fromEntries(Object.entries(regionGroups).filter(([_, value]) => value.name === 'secondary'))['1']
}

export const useIsAppInitialized = () => useAppSelector((state) => state.assessment.appInitialized)

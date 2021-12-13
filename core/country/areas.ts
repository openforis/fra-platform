import { i18n } from 'i18next'
import { Country } from '@core/country/country'
import { Global } from '@meta/area/global'
import { Region } from '@core/country/region'
import { RegionGroup } from '@core/country/regionGroup'
import { Strings } from '@core/utils'

const getListName = (isoCode: string, i18n: i18n): string => i18n.t(`area.${isoCode}.listName`)

const getLocale = (isoCode: string): string => {
  if (isoCode.includes('zh')) return 'zh-CN'
  return isoCode
}

const isISOGlobal = (isoCode: string): boolean => isoCode === Global.WO
const isISOCountry = (isoCode: string): boolean => /^[a-zA-Z0-9]{3}$/.test(isoCode)

type CompareFn = (isoCode1: string, isoCode2: string) => number
const getCompareListName =
  (i18n: i18n): CompareFn =>
  (isoCode1: string, isoCode2: string): number => {
    const country1 = Strings.normalize(getListName(isoCode1, i18n))
    const country2 = Strings.normalize(getListName(isoCode2, i18n))
    const locale = getLocale(i18n.language)
    return country1.localeCompare(country2, locale)
  }

const sortCountries = (countries: Array<Country>, i18n: i18n): Array<Country> => {
  const compareListName = getCompareListName(i18n)
  const compareCountries = (country1: Country, country2: Country) =>
    compareListName(country1.countryIso, country2.countryIso)
  return [...countries].sort(compareCountries)
}

const sortRegions = (regions: Array<Region>, i18n: i18n): Array<Region> => {
  const compareListName = getCompareListName(i18n)
  return [...regions].sort((r1, r2) => compareListName(r1.regionCode, r2.regionCode))
}

const sortRegionGroups = (regionGroups: Array<RegionGroup>): Array<RegionGroup> => {
  return [...regionGroups].sort((rg1, rg2) => +rg1.order - +rg2.order)
}

export const Areas = {
  getListName,
  getLocale,
  getCompareListName,
  isISOCountry,
  isISOGlobal,
  sortCountries,
  sortRegions,
  sortRegionGroups,
}

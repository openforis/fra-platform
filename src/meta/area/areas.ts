import { i18n } from 'i18next'
import { Strings } from 'utils/strings'

import { AreaCode, Country, CountryIso, Global, Region, RegionCode } from 'meta/area'
import { fraRegionCodes } from 'meta/area/regionCode'
import { CountryStatus } from 'meta/area/status'
import { Lang } from 'meta/lang'

const getCountryBackgroundImg = (isoCode: AreaCode): string =>
  isoCode.startsWith('X')
    ? `url('/img/flags/ATL.svg')`
    : `url('https://www.fao.org/images/corporatelibraries/flags/${isoCode.toLowerCase()}.svg')`

const getTranslationKey = (isoCode: AreaCode): string => `area.${isoCode}.listName`

const isAtlantis = (countryIso: CountryIso): boolean => countryIso.startsWith('X')
const isGlobal = (isoCode: CountryIso | RegionCode | Global): boolean => Global.WO === isoCode
const isISOCountry = (isoCode: string): boolean => /^[a-zA-Z0-9]{3}$/.test(isoCode)
const isISOGlobal = (isoCode: string): boolean => isoCode === Global.WO
const isRegion = (isoCode: string): boolean => Object.values(RegionCode).includes(isoCode as RegionCode)
const isFRARegion = (isoCode: string): boolean => fraRegionCodes.includes(isoCode as RegionCode)
const getStatus = (country: Country): CountryStatus => {
  const { status } = country?.props ?? {}

  return status
}

const getLocale = (isoCode: string): string => {
  if (isoCode.includes('zh')) return 'zh-CN'
  return isoCode
}

const getListName = (isoCode: string, i18n: i18n): string => i18n.t(`area.${isoCode}.listName`)

const getName = (area: Country | Region, lang: Lang, fallbackLang: Lang = Lang.en): string => {
  if (!area) return ''

  const { labels } = area

  if (labels?.[lang]) return labels[lang]
  if (fallbackLang && labels?.[fallbackLang]) return labels[fallbackLang]

  return ''
}

type CompareFn = (isoCode1: string, isoCode2: string) => number

const getCompareListName =
  (i18n: i18n): CompareFn =>
  (isoCode1: string, isoCode2: string): number => {
    const country1 = Strings.normalize(getListName(isoCode1, i18n))
    const country2 = Strings.normalize(getListName(isoCode2, i18n))
    const locale = getLocale(i18n.resolvedLanguage)
    return country1.localeCompare(country2, locale)
  }

export const Areas = {
  getCompareListName,
  getCountryBackgroundImg,
  getName,
  getStatus,
  getTranslationKey,
  isAtlantis,
  isFRARegion,
  isGlobal,
  isISOCountry,
  isISOGlobal,
  isRegion,
}

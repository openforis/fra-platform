import { AreaCode, Country, CountryIso, Global, RegionCode } from 'meta/area'
import { Region } from 'meta/area/region'
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

const _getSortIndex = (area: Country | Region, lang: Lang): number => {
  const { sortIndex } = area
  const langValue = sortIndex?.[lang]
  if (langValue !== undefined) return langValue

  const fallbackValue = sortIndex?.[Lang.en]
  if (fallbackValue !== undefined) return fallbackValue

  return Number.MAX_SAFE_INTEGER
}

const getCompareListName = <T extends Country | Region>(area1: T, area2: T, lang: Lang): number => {
  return _getSortIndex(area1, lang) - _getSortIndex(area2, lang)
}

export const Areas = {
  getCompareListName,
  getCountryBackgroundImg,
  getStatus,
  getTranslationKey,
  isAtlantis,
  isFRARegion,
  isGlobal,
  isISOCountry,
  isISOGlobal,
  isRegion,
}

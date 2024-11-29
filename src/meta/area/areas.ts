import { AreaCode, Country, CountryIso, Global, RegionCode } from 'meta/area'
import { fraRegionCodes } from 'meta/area/regionCode'
import { AssessmentStatus } from 'meta/area/status'
import { Cycle, Cycles } from 'meta/assessment'

const getCountryBackgroundImg = (isoCode: AreaCode): string =>
  isoCode.startsWith('X')
    ? `url('/img/flags/ATL.svg')`
    : `url('https://www.fao.org/images/corporatelibraries/flags/${isoCode.toLowerCase()}.svg')`

const getTranslationKey = (isoCode: AreaCode): string => `area.${isoCode}.listName`

const ATLANTIS_PREFIX = 'X'
const isAtlantis = (countryIso: CountryIso): boolean => countryIso.startsWith(ATLANTIS_PREFIX)
const isAtlantisAllowed = (cycle: Cycle): boolean => !Cycles.isPublished(cycle)

const isGlobal = (isoCode: CountryIso | RegionCode | Global) => Global.WO === isoCode
const isISOCountry = (isoCode: string): boolean => /^[a-zA-Z0-9]{3}$/.test(isoCode)
const isISOGlobal = (isoCode: string): boolean => isoCode === Global.WO
const isRegion = (isoCode: string): boolean => Object.values(RegionCode).includes(isoCode as RegionCode)
const isFRARegion = (isoCode: string): boolean => fraRegionCodes.includes(isoCode as RegionCode)
const getStatus = (country: Country): AssessmentStatus => {
  if (!country?.lastEdit) return AssessmentStatus.notStarted
  if (!country?.props?.status && country?.lastEdit) return AssessmentStatus.editing
  return country?.props?.status
}

export const Areas = {
  getCountryBackgroundImg,
  getStatus,
  getTranslationKey,
  isAtlantis,
  isAtlantisAllowed,
  isFRARegion,
  isGlobal,
  isISOCountry,
  isISOGlobal,
  isRegion,
  ATLANTIS_PREFIX,
}

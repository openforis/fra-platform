import { Country, CountryIso, Global, RegionCode } from 'meta/area'
import { fraRegionCodes } from 'meta/area/regionCode'
import { AssessmentStatus } from 'meta/area/status'

const getTranslationKey = (isoCode: CountryIso | RegionCode | Global): string => `area.${isoCode}.listName`

const isAtlantis = (countryIso: CountryIso): boolean => countryIso.startsWith('X')
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
  getTranslationKey,
  isAtlantis,
  isGlobal,
  isISOCountry,
  isRegion,
  isFRARegion,
  getStatus,
  isISOGlobal,
}

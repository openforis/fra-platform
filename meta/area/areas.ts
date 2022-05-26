import { Country, CountryIso, Global, RegionCode } from '@meta/area'
import { AssessmentStatus } from '@meta/area/country'
import { fraRegionCodes } from '@meta/area/regionCode'

const getTranslationKey = (isoCode: CountryIso | RegionCode | Global): string => `area.${isoCode}.listName`

const isGlobal = (isoCode: CountryIso | RegionCode | Global) => Global.WO === isoCode
const isISOCountry = (isoCode: string): boolean => /^[a-zA-Z0-9]{3}$/.test(isoCode)
const isRegion = (isoCode: string): boolean => Object.values(RegionCode).includes(isoCode as RegionCode)
const isFRARegion = (isoCode: string): boolean => fraRegionCodes.includes(isoCode as RegionCode)
const getStatus = (country: Country): AssessmentStatus => country?.props?.status ?? AssessmentStatus.editing

export const Areas = {
  getTranslationKey,
  isGlobal,
  isISOCountry,
  isRegion,
  isFRARegion,
  getStatus,
}

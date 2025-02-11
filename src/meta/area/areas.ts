import { Objects } from 'utils/objects'

import { AreaCode, Country, CountryIso, Global, RegionCode } from 'meta/area'
import { fraRegionCodes } from 'meta/area/regionCode'
import { AssessmentStatus } from 'meta/area/status'

const getCountryBackgroundImg = (isoCode: AreaCode): string =>
  isoCode.startsWith('X')
    ? `url('/img/flags/ATL.svg')`
    : `url('https://www.fao.org/images/corporatelibraries/flags/${isoCode.toLowerCase()}.svg')`

const getTranslationKey = (isoCode: AreaCode): string => `area.${isoCode}.listName`

const isAtlantis = (countryIso: CountryIso): boolean => countryIso.startsWith('X')
const isGlobal = (isoCode: CountryIso | RegionCode | Global) => Global.WO === isoCode
const isISOCountry = (isoCode: string): boolean => /^[a-zA-Z0-9]{3}$/.test(isoCode)
const isISOGlobal = (isoCode: string): boolean => isoCode === Global.WO
const isRegion = (isoCode: string): boolean => Object.values(RegionCode).includes(isoCode as RegionCode)
const isFRARegion = (isoCode: string): boolean => fraRegionCodes.includes(isoCode as RegionCode)
const getStatus = (country: Country): AssessmentStatus => {
  const hasLastEdit = !Objects.isNil(country?.lastEdit)
  const { status } = country?.props ?? {}
  const hasStatus = !Objects.isNil(status)

  if (!hasLastEdit) return AssessmentStatus.notStarted
  if (hasLastEdit && (!hasStatus || status === AssessmentStatus.notStarted)) return AssessmentStatus.editing
  return status
}

export const Areas = {
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

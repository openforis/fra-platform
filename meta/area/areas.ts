import { CountryIso, Global, RegionCode } from '@meta/area'

const getTranslationKey = (isoCode: CountryIso | RegionCode | Global): string => `area.${isoCode}.listName`

const isGlobal = (isoCode: CountryIso | RegionCode | Global) => Global.WO === isoCode
const isISOCountry = (isoCode: string): boolean => /^[a-zA-Z0-9]{3}$/.test(isoCode)
const isRegion = (isoCode: string): boolean => Object.values(RegionCode).includes(isoCode as RegionCode)

export const Areas = {
  getTranslationKey,
  isGlobal,
  isISOCountry,
  isRegion,
}

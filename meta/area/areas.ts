import { CountryIso, RegionCode, Global } from '@meta/area'

const getTranslationKey = (isoCode: CountryIso | RegionCode | Global) => `area.${isoCode}.listName`

const isGlobal = (isoCode: CountryIso | RegionCode | Global) => Global.WO === isoCode
const isISOCountry = (isoCode: string): boolean => /^[a-zA-Z0-9]{3}$/.test(isoCode)

export const Areas = {
  getTranslationKey,
  isGlobal,
  isISOCountry,
}

import { CountryIso, RegionCode, Global } from '@meta/area'

const getTranslationKey = (isoCode: CountryIso | RegionCode | Global) => `area.${isoCode}.listName`

export const Areas = {
  getTranslationKey,
}

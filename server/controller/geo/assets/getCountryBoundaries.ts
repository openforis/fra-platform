// @ts-ignore
import { FeatureCollection, Filter } from '@google/earthengine'

import { CountryIso } from '@meta/area'

export const getCountryBoundaries = (countryIso: CountryIso) => {
  const ftcUNMap25 = FeatureCollection('users/projectgeffao/World/Borders/UNmap25_CountriesTerritories_BNDA')
  return ftcUNMap25.filter(Filter.eq('ISO3CD', countryIso))
}

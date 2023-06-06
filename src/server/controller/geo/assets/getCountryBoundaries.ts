// @ts-ignore
import { FeatureCollection, Filter } from '@google/earthengine'

import { CountryIso } from 'meta/area'

export const getCountryBoundaries = (countryIso: CountryIso) => {
  const ftcCountries = FeatureCollection('users/geofra/boundaries/UN_Res0_ADM0_BNDA_CTY_FRA_v1')
  return ftcCountries.filter(Filter.eq('ISO3CD', countryIso))
}

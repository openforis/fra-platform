// @ts-ignore
import { FeatureCollection, Filter } from '@google/earthengine'

import { CountryIso } from 'meta/area/countryIso'

export const getCountryBoundaries = (countryIso: CountryIso): FeatureCollection => {
  const ftcCountries = FeatureCollection('users/geofra/boundaries/GAUL_5000m_test_2')
  return ftcCountries.filter(Filter.eq('ISO3', countryIso))
}

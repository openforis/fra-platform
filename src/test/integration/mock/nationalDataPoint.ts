import { CountryIso } from 'meta/area/countryIso'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

export const nationalDataPointCountryIso: CountryIso = 'X01'

export const nationalDataPointParams: Pick<OriginalDataPoint, 'comments' | 'countryIso' | 'values' | 'year'> = {
  comments: {},
  countryIso: nationalDataPointCountryIso,
  values: {},
  year: 2000,
}

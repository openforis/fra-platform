import { CountryIso } from 'meta/area/countryIso'
import { ODPNationalClass, OriginalDataPoint, OriginalDataPointComments } from 'meta/assessment/originalDataPoint'
import { OriginalDataPointValues } from 'meta/assessment/originalDataPoint/originalDataPoint'
import { Objects } from 'utils/objects'

export type OriginalDataPointDB = {
  comments: OriginalDataPointComments
  country_iso: CountryIso
  id: number
  national_classes: Array<ODPNationalClass>
  values: OriginalDataPointValues
  year: number
}

export const OriginalDataPointAdapter = (row: OriginalDataPointDB): OriginalDataPoint => {
  return Objects.camelize(row)
}

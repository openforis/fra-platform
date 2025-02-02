import { ODPReservedYear, OriginalDataPoint } from 'meta/assessment'

export type OriginalDataPointState = {
  data?: OriginalDataPoint
  history?: OriginalDataPoint
  reservedYears: Array<ODPReservedYear>
  updating?: boolean
}

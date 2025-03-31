import { ODPReservedYear, OriginalDataPoint } from 'meta/assessment/originalDataPoint'

export type OriginalDataPointState = {
  data?: OriginalDataPoint
  reservedYears: Array<ODPReservedYear>
  updating?: boolean
}

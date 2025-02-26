import { ODPReservedYear, OriginalDataPoint } from 'meta/assessment'

export type OriginalDataPointState = {
  data?: OriginalDataPoint
  reservedYears: Array<ODPReservedYear>
  updating?: boolean
}

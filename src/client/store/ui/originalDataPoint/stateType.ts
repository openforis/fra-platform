import { OriginalDataPoint } from '@meta/assessment'
import { ODPReservedYear } from '@meta/assessment/originalDataPoint'

export type OriginalDataPointState = {
  data?: OriginalDataPoint
  updating?: boolean
  reservedYears: Array<ODPReservedYear>
}

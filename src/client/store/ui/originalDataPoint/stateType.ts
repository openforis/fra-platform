import { OriginalDataPoint } from '@meta/assessment'

export type OriginalDataPointState = {
  data?: OriginalDataPoint
  updating?: boolean
  reservedYears: Array<number>
}

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

export type ODPDiffTextProps = {
  className?: string
  format?: 'decimal' | 'percent'
  originalDataPoint: OriginalDataPoint
  path: Array<string | number>
}

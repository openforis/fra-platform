import { OriginalDataPoint } from 'meta/assessment'

export type ODPDiffTextProps = {
  className?: string
  formatFn?: (value: string | null) => string
  originalDataPoint: OriginalDataPoint
  path: Array<string | number>
}

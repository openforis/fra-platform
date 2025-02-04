import { OriginalDataPoint } from 'meta/assessment'

export type ODPDiffTextProps = {
  className?: string
  formatFn?: (value: string) => string
  originalDataPoint: OriginalDataPoint
  path: Array<string | number>
}

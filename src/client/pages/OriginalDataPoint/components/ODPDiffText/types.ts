import { OriginalDataPoint } from 'meta/assessment'

export type ODPDiffTextProps = {
  excludePaddings?: boolean
  formatFn?: (value: string) => string
  originalDataPoint: OriginalDataPoint
  path: Array<string | number>
}

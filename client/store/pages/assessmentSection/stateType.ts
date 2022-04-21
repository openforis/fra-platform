import { TableSection } from '@meta/assessment'
import { TableData } from '@meta/data'

export type AssessmentSectionState = {
  data?: TableData
  originalDataPointData?: TableData
  tableSections: Record<string, Array<TableSection>>
  showOriginalDataPoint?: boolean
}

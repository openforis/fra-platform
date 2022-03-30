import { TableSection } from '@meta/assessment'
import { TableData } from '@meta/data'

export type AssessmentSectionState = {
  data?: TableData
  originalDataPointData?: TableData
  tableSections?: Array<TableSection>
  showOriginalDataPoint?: boolean
}

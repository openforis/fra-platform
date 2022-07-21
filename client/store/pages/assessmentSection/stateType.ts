import { TableSection } from '@meta/assessment'
import { NodeUpdate, TableData } from '@meta/data'

export type AssessmentSectionState = {
  data?: TableData
  originalDataPointData?: TableData
  tableSections: Record<string, Array<TableSection>>
  showOriginalDataPoint?: boolean
  // tableName -> nodeUpdate
  nodeValueValidation: Record<string, NodeUpdate>
}

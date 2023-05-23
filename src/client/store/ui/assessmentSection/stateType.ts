import { TableName } from '@meta/assessment'
import { NodeUpdate } from '@meta/data'

export type AssessmentSectionState = {
  showOriginalDataPoint?: boolean
  estimationPending: boolean
  nodeValueValidation: Record<TableName, NodeUpdate>
}

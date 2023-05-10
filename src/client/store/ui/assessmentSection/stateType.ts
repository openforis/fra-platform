import { CommentableDescriptionValue, DataSourceLinked, TableSection } from '@meta/assessment'
import { NodeUpdate, TableData } from '@meta/data'

export type AssessmentSectionBaseState = {
  data?: TableData
  // sectionName -> name -> content
  descriptions: Record<string, Record<string, CommentableDescriptionValue>>
  // sectionName -> Array<DataSource>
  linkedDataSources: Record<string, Array<DataSourceLinked>>
  // tableName -> nodeUpdate
  nodeValueValidation: Record<string, NodeUpdate>
  // sectionName -> tableSections
  tableSections: Record<string, Array<TableSection>>
}

export type AssessmentSectionState = any /* {
  showOriginalDataPoint: boolean
  estimationPending: boolean
  // [assessmentName in AssessmentName]?: Record<CycleName, AssessmentSectionBaseState>
  fra?: Record<CycleName, AssessmentSectionBaseState>
  panEuropean?: Record<CycleName, AssessmentSectionBaseState>
}
*/

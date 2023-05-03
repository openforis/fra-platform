import { CommentableDescriptionValue, DataSourceLinked, TableSection } from '@meta/assessment'
import { NodeUpdate, TableData } from '@meta/data'

export type AssessmentSectionState = {
  data?: TableData
  // sectionName -> name -> content
  descriptions: Record<string, Record<string, CommentableDescriptionValue>>
  estimationPending: boolean
  // sectionName -> Array<DataSource>
  linkedDataSources: Record<string, Array<DataSourceLinked>>
  // tableName -> nodeUpdate
  nodeValueValidation: Record<string, NodeUpdate>
  showOriginalDataPoint?: boolean
  // sectionName -> tableSections
  tableSections: Record<string, Array<TableSection>>
}

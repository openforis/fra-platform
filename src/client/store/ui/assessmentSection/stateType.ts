import {
  AssessmentName,
  CommentableDescriptionValue,
  CycleName,
  DataSourceLinked,
  TableSection,
} from '@meta/assessment'
import { NodeUpdate, TableData } from '@meta/data'

export type AssessmentSectionCycleState = {
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

type RootState = {
  showOriginalDataPoint?: boolean
  estimationPending: boolean
}

export type AssessmentSectionState = RootState & Record<AssessmentName, Record<CycleName, AssessmentSectionCycleState>>

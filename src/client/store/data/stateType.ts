import { AssessmentName, CommentableDescriptionValue, CycleName, DataSourceLinked, SectionName } from '@meta/assessment'
import { TableData } from '@meta/data'

export interface DataBaseState {
  tableData: TableData
  descriptions: Record<SectionName, Record<string, CommentableDescriptionValue>>
  linkedDataSources: Record<SectionName, Array<DataSourceLinked>>
}
export interface DataState {
  [assessmentName: AssessmentName]: {
    [cycleName: CycleName]: DataBaseState
  }
}

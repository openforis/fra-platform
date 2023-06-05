import { AssessmentName, CommentableDescriptionValue, CycleName, DataSourceLinked, SectionName } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

export interface DataBaseState {
  descriptions: Record<SectionName, Record<string, CommentableDescriptionValue>>
  linkedDataSources: Record<SectionName, Array<DataSourceLinked>>
}

interface TableDataState {
  tableData?: {
    [assessmentName: AssessmentName]: {
      [cycleName: CycleName]: RecordAssessmentData
    }
  }
}

type BaseState = Record<AssessmentName, Record<CycleName, DataBaseState>>

export type DataState = TableDataState & BaseState

import { AssessmentName, CommentableDescriptionValue, CycleName, DataSourceLinked, SectionName } from '@meta/assessment'
import { RecordAssessmentData } from '@meta/data'

export interface DataBaseState {
  descriptions: Record<SectionName, Record<string, CommentableDescriptionValue>>
  linkedDataSources: Record<SectionName, Array<DataSourceLinked>>
}

interface State1 {
  tableData?: {
    [assessmentName: AssessmentName]: {
      [cycleName: CycleName]: RecordAssessmentData
    }
  }
}

type State2 = Record<AssessmentName, Record<CycleName, DataBaseState>>

export type DataState = State1 & State2

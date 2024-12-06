import { AssessmentName, Row, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

export type RowProps = {
  assessmentName: AssessmentName
  data: RecordAssessmentData
  disabled: boolean
  lastRow?: boolean
  row: Row
  sectionName: string
  table: Table
}

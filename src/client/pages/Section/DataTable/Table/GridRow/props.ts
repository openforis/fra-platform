import { AssessmentName, Row, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

export type Props = {
  assessmentName: AssessmentName
  data: RecordAssessmentData
  disabled: boolean
  lastRow?: boolean
  row: Row
  sectionName: string
  table: Table
}

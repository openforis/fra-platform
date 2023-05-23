import { AssessmentName, Row, Table } from '@meta/assessment'
import { RecordAssessmentData } from '@meta/data'

export type Props = {
  assessmentName: AssessmentName
  data: RecordAssessmentData
  sectionName: string
  table: Table
  row: Row
  disabled: boolean
}

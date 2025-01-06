import { AssessmentName, Row, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

export type RowProps = {
  assessmentName: AssessmentName
  columnCount: number
  data: RecordAssessmentData
  disabled: boolean
  lastRow?: boolean
  row: Row
  rowCount: number
  rowIndex: number
  sectionName: string
  table: Table
}

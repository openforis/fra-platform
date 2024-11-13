import { Col, Row, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

export type GridHeadCellProps = {
  assessmentName: string
  col: Col
  colIndex: number
  data: RecordAssessmentData
  headers: Array<string>
  row: Row
  rowIndex: number
  table: Table
}

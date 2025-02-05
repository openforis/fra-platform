import { Col, Row, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { ColHeader } from '../types'

export type GridHeadCellProps = {
  assessmentName: string
  col: Col
  colIndex: number
  data: RecordAssessmentData
  firstCol: boolean
  headers: Array<ColHeader>
  row: Row
  rowIndex: number
  table: Table
}

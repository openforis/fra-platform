import { Col, Row, Table } from 'meta/assessment'

import { ColHeader } from 'client/pages/Section/DataTable/Table/types'

export type GridHeadCellProps = {
  assessmentName: string
  col: Col
  colIndex: number
  firstCol: boolean
  headers: Array<ColHeader>
  row: Row
  rowIndex: number
  table: Table
}

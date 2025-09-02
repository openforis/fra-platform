import { Col } from 'meta/assessment/col'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'

import { ColHeader } from 'client/pages/Section/DataTable/Table/types'

import { SortState } from '../hooks/useTableSorting'

export type GridHeadCellProps = {
  assessmentName: string
  col: Col
  colIndex: number
  firstCol: boolean
  headers: Array<ColHeader>
  row: Row
  rowIndex: number
  table: Table
  onSort?: (columnUuid: string) => void
  sortState?: SortState
}

import { Cycle, Row, Table } from 'meta/assessment'

import { ColHeader } from 'client/pages/Section/DataTable/Table/types'

export type PropsTranspose = {
  cycle: Cycle
  headers: Array<ColHeader>
  rowsData: Array<Row>
  rowsHeader: Array<Row>
  table: Table
}

export type ReturnedTranspose = {
  headers: Array<ColHeader>
  table: Table
  rowsData: Array<Row>
  rowsHeader: Array<Row>
}

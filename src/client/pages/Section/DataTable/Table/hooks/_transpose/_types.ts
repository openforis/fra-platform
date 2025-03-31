import { TFunction } from 'i18next'

import { Cycle } from 'meta/assessment/cycle'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'

import { ColHeader } from 'client/pages/Section/DataTable/Table/types'

export type PropsTranspose = {
  cycle: Cycle
  headers: Array<ColHeader>
  rowsData: Array<Row>
  rowsHeader: Array<Row>
  t: TFunction
  table: Table
}

export type ReturnedTranspose = {
  headers: Array<ColHeader>
  table: Table
  rowsData: Array<Row>
  rowsHeader: Array<Row>
}

export type TransposeHeaders = (props: PropsTranspose) => Pick<ReturnedTranspose, 'headers' | 'rowsHeader'>

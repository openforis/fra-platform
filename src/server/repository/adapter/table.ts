import { Objects } from 'utils/objects'

import { Table, TableProps } from 'meta/assessment/table'

import { RowAdapter, RowDB } from 'server/repository/adapter/row'

export interface TableDB {
  id: number
  props: TableProps & { cycles: Array<string> }
  rows?: Array<RowDB>
  table_section_id: number
  uuid: string
}

export const TableAdapter = (tableDb: TableDB): Table => {
  const { props, rows, ...table } = tableDb

  return {
    ...Objects.camelize(table),
    props,
    rows: rows?.map(RowAdapter),
  }
}

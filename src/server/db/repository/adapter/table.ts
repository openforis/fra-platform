import { Objects } from 'utils/objects'

import { Table, TableProps } from 'meta/assessment/table'
import { UUID } from 'meta/uuid'

import { RowAdapter, RowDB } from 'server/db/repository/adapter/row'

export interface TableDB {
  id: number
  props: TableProps & { cycles: Array<string> }
  rows?: Array<RowDB>
  table_section_uuid: UUID
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

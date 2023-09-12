import { Objects } from 'utils/objects'

import { Table, TableProps } from 'meta/assessment'

import { RowAdapter, RowDB } from 'server/repository/adapter/row'

export interface TableDB {
  id: number
  calculationDependencies?: Table['calculationDependencies']
  props: TableProps & { cycles: Array<string> }
  rows?: Array<RowDB>
  table_section_id: number
  validationDependencies?: Table['validationDependencies']
  uuid: string
}

export const TableAdapter = (tableDb: TableDB): Table => {
  const { calculationDependencies, props, rows, validationDependencies, ...table } = tableDb

  return {
    ...Objects.camelize(table),
    calculationDependencies,
    props,
    rows: rows?.map(RowAdapter),
    validationDependencies,
  }
}

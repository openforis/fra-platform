import { Objects } from 'utils/objects'

import { TableSection, TableSectionProps } from 'meta/assessment'

import { TableAdapter, TableDB } from 'server/repository/adapter/table'

export interface TableSectionDB {
  id: number
  // @ts-ignore
  section_id: number
  uuid: string
  props: TableSectionProps & { cycles: Array<string> }
  tables?: Array<TableDB>
}

export const TableSectionAdapter = (tableSectionDB: TableSectionDB): TableSection => {
  const { props, tables, ...tableSection } = tableSectionDB

  return {
    ...Objects.camelize(tableSection),
    props,
    tables: tables?.map(TableAdapter),
  }
}

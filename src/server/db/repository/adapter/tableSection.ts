import { Objects } from 'utils/objects'

import { TableSection, TableSectionProps } from 'meta/assessment/tableSection'
import { UUID } from 'meta/uuid'

import { TableAdapter, TableDB } from 'server/db/repository/adapter/table'

export interface TableSectionDB {
  id: number
  section_uuid: UUID
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

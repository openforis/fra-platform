import { TableNames } from 'meta/assessment/table'
import { TablesCondition } from 'meta/data'

import { PropsGetTableData } from './props'

export const getTablesCondition = (
  props: Pick<PropsGetTableData, 'tableNames' | 'columns' | 'variables' | 'mergeOdp'>
): TablesCondition => {
  const { columns, mergeOdp, tableNames, variables } = props

  const tables: TablesCondition = {}

  tableNames.forEach((tableName) => {
    tables[tableName] = { columns, variables }
  })
  const withOdp =
    mergeOdp &&
    (tableNames.includes(TableNames.extentOfForest) || tableNames.includes(TableNames.forestCharacteristics))
  if (withOdp) {
    tables[TableNames.originalDataPointValue] = { columns, variables }
  }

  return tables
}

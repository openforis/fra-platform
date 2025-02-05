import { TableNames } from 'meta/assessment'
import { TablesCondition } from 'meta/data'

import { PropsGetTableData } from './props'

export const getTablesCondition = (
  props: Pick<PropsGetTableData, 'tableNames' | 'columns' | 'variables' | 'mergeOdp'>
): TablesCondition => {
  const { tableNames, columns, variables, mergeOdp } = props

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

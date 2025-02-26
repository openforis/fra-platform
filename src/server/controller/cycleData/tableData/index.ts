import { getTableDataLastApproved } from './_lastApproved/getTableDataLastApproved'
import { getAggregatedTableData } from './getAggregatedTableData'
import { massiveInsert } from './massiveInsert'
import { refreshViews } from './refreshViews'
import { updateTableDataDependencies } from './updateTableDataDependencies'

export const TableData = {
  getAggregatedTableData,
  getTableDataLastApproved,
  massiveInsert,
  refreshViews,
  updateTableDataDependencies,
}

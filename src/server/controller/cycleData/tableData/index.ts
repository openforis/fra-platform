import { getTableDataLastApproved } from './_lastApproved/getTableDataLastApproved'
import { dropViews } from './dropViews'
import { getAggregatedTableData } from './getAggregatedTableData'
import { massiveInsert } from './massiveInsert'
import { refreshViews } from './refreshViews'
import { updateTableDataDependencies } from './updateTableDataDependencies'

export const TableData = {
  dropViews,
  getAggregatedTableData,
  getTableDataLastApproved,
  massiveInsert,
  refreshViews,
  updateTableDataDependencies,
}

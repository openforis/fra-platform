import { BulkDownload } from './bulkDownload'
import { deleteNodeValues } from './deleteNodeValues'
import { getAggregatedTableData } from './getAggregatedTableData'
import { getOriginalDataPointData } from './getOriginalDataPointData'
import { getTableData } from './getTableData'

export type { TablesCondition } from './getTableData'

export const DataRepository = {
  getTableData,
  getOriginalDataPointData,
  deleteNodeValues,
  getAggregatedTableData,
  BulkDownload,
}

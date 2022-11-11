import { deleteNodeValues } from './deleteNodeValues'
import { getAggregatedTableData } from './getAggregatedTableData'
import { getOriginalDataPointData } from './getOriginalDataPointData'
import { getOriginalDataPointNode } from './getOriginalDataPointNode'
import { getTableData } from './getTableData'

export type { TablesCondition } from './getTableData'

export const DataRepository = {
  getTableData,
  getOriginalDataPointNode,
  getOriginalDataPointData,
  deleteNodeValues,
  getAggregatedTableData,
}

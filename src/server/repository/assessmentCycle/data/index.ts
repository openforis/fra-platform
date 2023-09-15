import { clearTableData } from './clearTableData'
import { getAggregatedTableData } from './getAggregatedTableData'
import { getOriginalDataPointData } from './getOriginalDataPointData'
import { getTableData } from './getTableData'

export const DataRepository = {
  getTableData,
  getOriginalDataPointData,
  getAggregatedTableData,
  clearTableData,
}

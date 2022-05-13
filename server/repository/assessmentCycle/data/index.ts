import { clearTable } from './clearTable'
import { getOriginalDataPointData } from './getOriginalDataPointData'
import { getTableData } from './getTableData'

export type { TablesCondition } from './getTableData'

export const DataRepository = {
  getTableData,
  getOriginalDataPointData,
  clearTable,
}

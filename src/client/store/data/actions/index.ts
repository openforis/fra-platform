import { DataDeprecatedSlice } from 'client/store/data/slice'

import { clearTableData } from './clearTableData'
import { getODPLastUpdatedTimestamp } from './getODPLastUpdatedTimestamp'
import { getTableData } from './getTableData'
import { setNodeValues } from './setNodeValues'
import { updateNodeValues } from './updateNodeValues'

export const DataActions = {
  ...DataDeprecatedSlice.actions,
  // Table data
  setNodeValues,
  clearTableData,
  getTableData,
  updateNodeValues,

  // Original Data Point
  getODPLastUpdatedTimestamp,
}

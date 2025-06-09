import { DataDeprecatedSlice } from 'client/store/data/slice'

import { clearTableData } from './clearTableData'
import { getDescriptionsHistory } from './getDescriptionsHistory'
import { getLinkedDataSources } from './getLinkedDataSources'
import { getODPLastUpdatedTimestamp } from './getODPLastUpdatedTimestamp'
import { getOriginalDataPointHistory } from './getOriginalDataPointHistory'
import { getTableData } from './getTableData'
import { getTableDataHistory } from './getTableDataHistory'
import { setNodeValues } from './setNodeValues'
import { updateNodeValues } from './updateNodeValues'

export const DataActions = {
  ...DataDeprecatedSlice.actions,
  // Table data
  setNodeValues,
  clearTableData,
  getTableData,
  getTableDataHistory,
  updateNodeValues,

  // Original Data Point
  getODPLastUpdatedTimestamp,
  getOriginalDataPointHistory,

  // Descriptions
  getLinkedDataSources,
  getDescriptionsHistory,
}

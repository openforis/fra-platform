import { DataDeprecatedSlice } from 'client/store/data/slice'

import { clearTableData } from './clearTableData'
import { copyPreviousDatasources } from './copyPreviousDatasources'
import { deleteDataSource } from './deleteDataSource'
import { getDescription } from './getDescription'
import { getDescriptionsHistory } from './getDescriptionsHistory'
import { getLinkedDataSources } from './getLinkedDataSources'
import { getNodeValuesEstimations } from './getNodeValuesEstimations'
import { getODPLastUpdatedTimestamp } from './getODPLastUpdatedTimestamp'
import { getOriginalDataPointHistory } from './getOriginalDataPointHistory'
import { getTableData } from './getTableData'
import { getTableDataHistory } from './getTableDataHistory'
import { postEstimate } from './postEstimate'
import { setNodeValues } from './setNodeValues'
import { updateDescription } from './updateDescription'
import { updateNodeValues } from './updateNodeValues'

export const DataActions = {
  ...DataDeprecatedSlice.actions,
  // Table data
  setNodeValues,
  clearTableData,
  getTableData,
  getTableDataHistory,
  updateNodeValues,
  getNodeValuesEstimations,

  // Original Data Point
  getODPLastUpdatedTimestamp,
  getOriginalDataPointHistory,

  // Estimations
  postEstimate,

  // Descriptions
  getDescription,
  updateDescription,
  copyPreviousDatasources,
  deleteDataSource,
  getLinkedDataSources,
  getDescriptionsHistory,
}

import { createMaterializedFaoEstimateView } from 'server/repository/assessmentCycle/data/createMaterializedFaoEstimateView'

import { clearTableData } from './clearTableData'
import { createOrReplaceTableDataView } from './createOrReplaceTableDataView'
import { getAggregatedTableData } from './getAggregatedTableData'
import { getOriginalDataPointData } from './getOriginalDataPointData'
import { getTableData } from './getTableData'

export const DataRepository = {
  clearTableData,
  createMaterializedFaoEstimateView,
  createOrReplaceTableDataView,
  getAggregatedTableData,
  getOriginalDataPointData,
  getTableData,
}

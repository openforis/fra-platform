import { clearTableData } from 'server/db/repository/assessmentCycle/data/clearTableData'
import { createOrReplaceTableDataView } from 'server/db/repository/assessmentCycle/data/createOrReplaceTableDataView'
import { getFaoEstimateData } from 'server/db/repository/assessmentCycle/data/getFaoEstimateData'
import { getOriginalDataPointData } from 'server/db/repository/assessmentCycle/data/getOriginalDataPointData'
import { getOriginalDataPointDataLastApproved } from 'server/db/repository/assessmentCycle/data/getOriginalDataPointDataLastApproved'
import { getTableData } from 'server/db/repository/assessmentCycle/data/getTableData'
import { getTableDataLastApproved } from 'server/db/repository/assessmentCycle/data/getTableDataLastApproved'

export const DataRepository = {
  clearTableData,
  createOrReplaceTableDataView,
  getFaoEstimateData,
  getOriginalDataPointData,
  getOriginalDataPointDataLastApproved,
  getTableData,
  getTableDataLastApproved,
}

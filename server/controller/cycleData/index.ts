import { DataRepository } from '@server/repository/assessmentCycle/data'

import { getReviewStatus } from './getReviewStatus'
import { getTableData } from './getTableData'
import { persistNodeValue } from './persistNodeValue'
import { persistNodeValues } from './persistNodeValues'

export const CycleDataController = {
  persistNodeValue,
  getTableData,
  getReviewStatus,
  persistNodeValues,
  getOriginalDataPointData: DataRepository.getOriginalDataPointData,
  deleteNodeValues: DataRepository.deleteNodeValues,
}

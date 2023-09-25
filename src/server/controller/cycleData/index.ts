import { deleteOriginalDataPointNationalClass } from 'server/controller/cycleData/originalDataPoint/deleteOriginalDataPointNationalClass'
import { DescriptionRepository } from 'server/repository/assessmentCycle/descriptions'
import { MessageTopicUserRepository } from 'server/repository/assessmentCycle/messageTopicUser'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

import { copyOriginalDataPointNationalClasses } from './originalDataPoint/copyOriginalDataPointNationalClasses'
import { createOriginalDataPoint } from './originalDataPoint/createOriginalDataPoint'
import { getOriginalDataPoint } from './originalDataPoint/getOriginalDataPoint'
import { getOriginalDataPointData } from './originalDataPoint/getOriginalDataPointData'
import { removeOriginalDataPoint } from './originalDataPoint/removeOriginalDataPoint'
import { updateOriginalDataPoint } from './originalDataPoint/updateOriginalDataPoint'
import { updateOriginalDataPointDataSources } from './originalDataPoint/updateOriginalDataPointDataSources'
import { updateOriginalDataPointDescription } from './originalDataPoint/updateOriginalDataPointDescription'
import { updateOriginalDataPointNationalClasses } from './originalDataPoint/updateOriginalDataPointNationalClasses'
import { updateOriginalDataPointOriginalData } from './originalDataPoint/updateOriginalDataPointOriginalData'
import { clearTableData } from './clearTableData'
import { getBulkDownload } from './getBulkDownload'
import { getNodeValuesEstimations } from './getNodeValuesEstimations'
import { getReviewStatus } from './getReviewStatus'
import { getTableData } from './getTableData'
import { persistNodeValues, persistNodeValuesEstimated } from './persistNodeValues'
import { upsertDescription } from './upsertDescription'

export const CycleDataController = {
  // node
  persistNodeValues,
  persistNodeValuesEstimated,
  // table data
  getOriginalDataPointData,
  getTableData,
  clearTableData,
  getNodeValuesEstimations,
  // original data points
  createOriginalDataPoint,
  getOriginalDataPoint,
  getOriginalDataPoints: OriginalDataPointRepository.getMany,
  getOriginalDataPointReservedYears: OriginalDataPointRepository.getReservedYears,
  removeOriginalDataPoint,
  updateOriginalDataPoint,

  copyOriginalDataPointNationalClasses,

  updateOriginalDataPointDataSources,
  updateOriginalDataPointDescription,
  updateOriginalDataPointOriginalData,

  deleteOriginalDataPointNationalClass,
  updateOriginalDataPointNationalClasses,

  // review
  getReviewStatus,
  getReviewSummary: MessageTopicUserRepository.getReviewSummary,
  // description
  getDataSources: DescriptionRepository.getDataSources,
  getDescription: DescriptionRepository.getOneOrNone,
  upsertDescription,
  getActivities: ActivityLogRepository.getCycleDataActivities,
  getBulkDownload,
}

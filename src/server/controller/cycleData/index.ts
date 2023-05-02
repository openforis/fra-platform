import { DataRepository } from '@server/repository/assessmentCycle/data'
import { DescriptionRepository } from '@server/repository/assessmentCycle/descriptions'
import { MessageTopicUserRepository } from '@server/repository/assessmentCycle/messageTopicUser'
import { OriginalDataPointRepository } from '@server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from '@server/repository/public/activityLog'

import { clearTableData } from './clearTableData'
import { createOriginalDataPoint } from './createOriginalDataPoint'
import { getBulkDownload } from './getBulkDownload'
import { getOriginalDataPoint } from './getOriginalDataPoint'
import { getReviewStatus } from './getReviewStatus'
import { getTableData } from './getTableData'
import { persistNodeValues } from './persistNodeValues'
import { removeOriginalDataPoint } from './removeOriginalDataPoint'
import { updateOriginalDataPoint } from './updateOriginalDataPoint'
import { upsertDescription } from './upsertDescription'

export const CycleDataController = {
  // node
  persistNodeValues,
  // table data
  getOriginalDataPointData: DataRepository.getOriginalDataPointData,
  getTableData,
  clearTableData,
  // original data points
  createOriginalDataPoint,
  getOriginalDataPoint,
  getOriginalDataPoints: OriginalDataPointRepository.getMany,
  getOriginalDataPointReservedYears: OriginalDataPointRepository.getReservedYears,
  removeOriginalDataPoint,
  updateOriginalDataPoint,
  // review
  getReviewStatus,
  getReviewSummary: MessageTopicUserRepository.getReviewSummary,
  // description
  getDescription: DescriptionRepository.getOneOrNone,
  upsertDescription,
  getActivities: ActivityLogRepository.getCycleDataActivities,
  getBulkDownload,
}

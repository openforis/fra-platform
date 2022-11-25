import { DataRepository } from '@server/repository/assessmentCycle/data'
import { DescriptionRepository } from '@server/repository/assessmentCycle/descriptions'
import { MessageTopicUserRepository } from '@server/repository/assessmentCycle/messageTopicUser'
import { OriginalDataPointRepository } from '@server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from '@server/repository/public/activityLog'

import { createOriginalDataPoint } from './createOriginalDataPoint'
import { deleteNodeValues } from './deleteNodeValues'
import { getBulkDownload } from './getBulkDownload'
import { getOriginalDataPoint } from './getOriginalDataPoint'
import { getOriginalDataPointReservedYears } from './getOriginalDataPointReservedYears'
import { getReviewStatus } from './getReviewStatus'
import { getTableData } from './getTableData'
import { persistNodeValue } from './persistNodeValue'
import { persistNodeValues } from './persistNodeValues'
import { removeOriginalDataPoint } from './removeOriginalDataPoint'
import { updateOriginalDataPoint } from './updateOriginalDataPoint'
import { upsertDescription } from './upsertDescription'

export const CycleDataController = {
  // node
  persistNodeValue,
  persistNodeValues,
  deleteNodeValues,
  // table data
  getOriginalDataPointData: DataRepository.getOriginalDataPointData,
  getTableData,
  // original data points
  createOriginalDataPoint,
  getOriginalDataPoint,
  getOriginalDataPoints: OriginalDataPointRepository.getMany,
  getOriginalDataPointReservedYears,
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

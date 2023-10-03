import { deleteOriginalDataPointNationalClass } from 'server/controller/cycleData/originalDataPoint/deleteOriginalDataPointNationalClass'
import { CountryActivityLogRepository } from 'server/repository/assessmentCycle/countryActivityLog'
import { DescriptionRepository } from 'server/repository/assessmentCycle/descriptions'
import { MessageTopicUserRepository } from 'server/repository/assessmentCycle/messageTopicUser'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'

import { copyOriginalDataPointNationalClasses } from './originalDataPoint/copyOriginalDataPointNationalClasses'
import { createOriginalDataPoint } from './originalDataPoint/createOriginalDataPoint'
import { removeOriginalDataPoint } from './originalDataPoint/removeOriginalDataPoint'
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
  // ===== node
  persistNodeValues,
  persistNodeValuesEstimated,

  // node values estimation
  getNodeValuesEstimations,

  // ===== table data
  clearTableData,
  getTableData,

  // ===== original data point
  createOriginalDataPoint,
  getOriginalDataPoint: OriginalDataPointRepository.getOne,
  getOriginalDataPoints: OriginalDataPointRepository.getMany,
  getOriginalDataPointReservedYears: OriginalDataPointRepository.getReservedYears,
  removeOriginalDataPoint,
  // data
  updateOriginalDataPointOriginalData,
  // data sources
  updateOriginalDataPointDataSources,
  // description
  updateOriginalDataPointDescription,
  // national classes
  copyOriginalDataPointNationalClasses,
  deleteOriginalDataPointNationalClass,
  updateOriginalDataPointNationalClasses,

  // ===== review
  getReviewStatus,
  getReviewSummary: MessageTopicUserRepository.getReviewSummary,

  // ==== description
  getDataSources: DescriptionRepository.getDataSources,
  getDescription: DescriptionRepository.getOneOrNone,
  upsertDescription,

  // ==== activities
  getActivities: CountryActivityLogRepository.getMany,
  getActivitiesCount: CountryActivityLogRepository.getCount,

  // bulk download
  getBulkDownload,
}

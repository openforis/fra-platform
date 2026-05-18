import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'
import { History } from 'server/controller/cycleData/history'
import { Links } from 'server/controller/cycleData/links'
import { deleteOriginalDataPointNationalClass } from 'server/controller/cycleData/originalDataPoint/deleteOriginalDataPointNationalClass'
import { Report } from 'server/controller/cycleData/report'
import { Repository } from 'server/controller/cycleData/repository'
import { TableData } from 'server/controller/cycleData/tableData'
import { getValidationSummary } from 'server/controller/cycleData/validations/summary/getSummary'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'
import { MessageTopicUserRepository } from 'server/db/repository/assessmentCycle/messageTopicUser'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'

import { copyOriginalDataPointNationalClasses } from './originalDataPoint/copyOriginalDataPointNationalClasses'
import { createOriginalDataPoint } from './originalDataPoint/createOriginalDataPoint'
import { getOriginalDataPointLastApproved } from './originalDataPoint/getOriginalDataPointLastApproved'
import { removeOriginalDataPoint } from './originalDataPoint/removeOriginalDataPoint'
import { updateOriginalDataPointDataSources } from './originalDataPoint/updateOriginalDataPointDataSources'
import { updateOriginalDataPointDescription } from './originalDataPoint/updateOriginalDataPointDescription'
import { updateOriginalDataPointNationalClasses } from './originalDataPoint/updateOriginalDataPointNationalClasses'
import { updateOriginalDataPointOriginalData } from './originalDataPoint/updateOriginalDataPointOriginalData'
import { updateOriginalDataPointYear } from './originalDataPoint/updateOriginalDataPointYear'
import { clearTableData } from './clearTableData'
import { Contacts } from './contact'
import { Description } from './description'
import { getBulkDownload } from './getBulkDownload'
import { getLastPublishedData } from './getLastPublishedData'
import { getNodeValuesEstimations } from './getNodeValuesEstimations'
import { getReviewStatus } from './getReviewStatus'
import { getTableData } from './getTableData'
import { persistNodeValues, persistNodeValuesEstimated } from './persistNodeValues'

export const CycleDataController = {
  // ===== node
  persistNodeValues,
  persistNodeValuesEstimated,

  // node values estimation
  getNodeValuesEstimations,

  // ===== table data
  clearTableData,
  getLastPublishedData,
  getTableData,

  // ===== original data point
  createOriginalDataPoint,
  getOriginalDataPoint: OriginalDataPointRepository.getOne,
  getOriginalDataPointLastApproved,
  getOriginalDataPointReservedYears: OriginalDataPointRepository.getReservedYears,
  getOriginalDataPoints: OriginalDataPointRepository.getMany,
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
  // year
  updateOriginalDataPointYear,

  // ===== review
  getReviewStatus,
  getReviewSummary: MessageTopicUserRepository.getReviewSummary,
  getTableValidations: TableValidationRedisRepository.getTableValidations,
  getValidationSummary,

  // ==== activities
  getActivities: CountryActivityLogRepository.getMany,
  getActivitiesCount: CountryActivityLogRepository.getCount,

  // ====== description
  Description,

  // ====== history
  History,

  // bulk download
  getBulkDownload,

  // ====== node ext
  // -- contact
  Contacts,

  // -- Data
  TableData,

  // ====== report
  Report,

  // ====== repository
  Repository,

  // ====== links
  Links,
}

import { CountryActivityLogRepository } from 'server/repository/assessmentCycle/countryActivityLog'
import { CountrySummaryRepository } from 'server/repository/assessmentCycle/countrySummary'
import { DescriptionRepository } from 'server/repository/assessmentCycle/descriptions'
import { MessageTopicUserRepository } from 'server/repository/assessmentCycle/messageTopicUser'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'

import { createContact } from './nodeExt/createContact'
import { getContacts } from './nodeExt/getContacts'
import { removeContact } from './nodeExt/removeContact'
import { updateContact } from './nodeExt/updateContact'
import { copyOriginalDataPointNationalClasses } from './originalDataPoint/copyOriginalDataPointNationalClasses'
import { createOriginalDataPoint } from './originalDataPoint/createOriginalDataPoint'
import { deleteOriginalDataPointNationalClass } from './originalDataPoint/deleteOriginalDataPointNationalClass'
import { removeOriginalDataPoint } from './originalDataPoint/removeOriginalDataPoint'
import { updateOriginalDataPointDataSources } from './originalDataPoint/updateOriginalDataPointDataSources'
import { updateOriginalDataPointDescription } from './originalDataPoint/updateOriginalDataPointDescription'
import { updateOriginalDataPointNationalClasses } from './originalDataPoint/updateOriginalDataPointNationalClasses'
import { updateOriginalDataPointOriginalData } from './originalDataPoint/updateOriginalDataPointOriginalData'
import { updateOriginalDataPointYear } from './originalDataPoint/updateOriginalDataPointYear'
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
  getLastEditOdpData: CountrySummaryRepository.getLastEditOdpData,
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

  // ==== description
  getDataSources: DescriptionRepository.getDataSources,
  getDescriptionValues: DescriptionRepository.getValues,
  upsertDescription,

  // ==== activities
  getActivities: CountryActivityLogRepository.getMany,
  getActivitiesCount: CountryActivityLogRepository.getCount,

  // bulk download
  getBulkDownload,

  // ====== node ext
  // -- contact
  createContact,
  updateContact,
  removeContact,
  getContacts,
}

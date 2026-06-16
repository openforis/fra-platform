import { History } from 'server/controller/cycleData/history'
import { Links } from 'server/controller/cycleData/links'
import { Report } from 'server/controller/cycleData/report'
import { Repository } from 'server/controller/cycleData/repository'
import { TableData } from 'server/controller/cycleData/tableData'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'
import { MessageTopicUserRepository } from 'server/db/repository/assessmentCycle/messageTopicUser'

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

  // ===== review
  getReviewStatus,
  getReviewSummary: MessageTopicUserRepository.getReviewSummary,

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

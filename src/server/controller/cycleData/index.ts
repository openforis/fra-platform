import { History } from 'server/controller/cycleData/history'
import { Links } from 'server/controller/cycleData/links'
import { Report } from 'server/controller/cycleData/report'
import { Repository } from 'server/controller/cycleData/repository'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'
import { MessageTopicUserRepository } from 'server/db/repository/assessmentCycle/messageTopicUser'

import { getBulkDownload } from './getBulkDownload'
import { getReviewStatus } from './getReviewStatus'

export const CycleDataController = {
  // ===== review
  getReviewStatus,
  getReviewSummary: MessageTopicUserRepository.getReviewSummary,

  // ==== activities
  getActivities: CountryActivityLogRepository.getMany,
  getActivitiesCount: CountryActivityLogRepository.getCount,

  // ====== history
  History,

  // bulk download
  getBulkDownload,

  // ====== node ext

  // ====== report
  Report,

  // ====== repository
  Repository,

  // ====== links
  Links,
}

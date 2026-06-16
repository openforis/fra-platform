import { Report } from 'server/controller/cycleData/report'
import { Repository } from 'server/controller/cycleData/repository'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'
import { MessageTopicUserRepository } from 'server/db/repository/assessmentCycle/messageTopicUser'

import { getReviewStatus } from './getReviewStatus'

export const CycleDataController = {
  // ===== review
  getReviewStatus,
  getReviewSummary: MessageTopicUserRepository.getReviewSummary,

  // ==== activities
  getActivities: CountryActivityLogRepository.getMany,
  getActivitiesCount: CountryActivityLogRepository.getCount,

  // ====== report
  Report,

  // ====== repository
  Repository,
}

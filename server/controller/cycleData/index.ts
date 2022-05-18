import { MessageTopicUserRepository } from '@server/repository/assessmentCycle/messageTopicUser'

import { getReviewStatus } from './getReviewStatus'
import { getTableData } from './getTableData'
import { persistNodeValue } from './persistNodeValue'

export const CycleDataController = {
  persistNodeValue,
  getTableData,
  getReviewStatus,
  getReviewSummary: MessageTopicUserRepository.getReviewSummary,
}

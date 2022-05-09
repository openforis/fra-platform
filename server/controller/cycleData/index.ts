import { MessageTopicUserRepository } from '@server/repository/assessmentCycle/messageTopicUser'

import { getTableData } from './getTableData'
import { persistNodeValue } from './persistNodeValue'

export const CycleDataController = {
  persistNodeValue,
  getTableData,
  getReviewStatus: MessageTopicUserRepository.getReviewStatus,
}

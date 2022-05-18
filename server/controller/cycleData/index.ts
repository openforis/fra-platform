import { DataRepository } from '@server/repository/assessmentCycle/data'

import { deleteNodeValues } from './deleteNodeValues'
import { MessageTopicUserRepository } from '@server/repository/assessmentCycle/messageTopicUser'

import { getReviewStatus } from './getReviewStatus'
import { getTableData } from './getTableData'
import { persistNodeValue } from './persistNodeValue'
import { persistNodeValues } from './persistNodeValues'

export const CycleDataController = {
  persistNodeValue,
  getTableData,
  getReviewStatus,
  persistNodeValues,
  getOriginalDataPointData: DataRepository.getOriginalDataPointData,
  deleteNodeValues,
  getReviewSummary: MessageTopicUserRepository.getReviewSummary,
}

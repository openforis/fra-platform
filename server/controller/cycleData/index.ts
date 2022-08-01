import { DataRepository } from '@server/repository/assessmentCycle/data'
import { DescriptionRepository } from '@server/repository/assessmentCycle/descriptions'
import { MessageTopicUserRepository } from '@server/repository/assessmentCycle/messageTopicUser'

import { deleteNodeValues } from './deleteNodeValues'
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
  getCommentableDescription: DescriptionRepository.getOneOrNone,
}

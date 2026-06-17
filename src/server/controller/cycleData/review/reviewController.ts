import { getReviewStatus } from 'server/controller/cycleData/review/getReviewStatus'
import { MessageTopicUserRepository } from 'server/db/repository/assessmentCycle/messageTopicUser'

export const ReviewController = {
  getReviewStatus,
  getReviewSummary: MessageTopicUserRepository.getReviewSummary,
}

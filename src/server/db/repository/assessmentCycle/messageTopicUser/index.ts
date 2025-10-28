import { create } from 'server/db/repository/assessmentCycle/messageTopicUser/create'
import { getOdpReviewStatus } from 'server/db/repository/assessmentCycle/messageTopicUser/getOdpReviewStatus'
import { getOneOrNone } from 'server/db/repository/assessmentCycle/messageTopicUser/getOneOrNone'
import { getReviewStatus } from 'server/db/repository/assessmentCycle/messageTopicUser/getReviewStatus'
import { getReviewSummary } from 'server/db/repository/assessmentCycle/messageTopicUser/getReviewSummary'
import { getUnreadMessages } from 'server/db/repository/assessmentCycle/messageTopicUser/getUnreadMessages'
import { update } from 'server/db/repository/assessmentCycle/messageTopicUser/update'

export const MessageTopicUserRepository = {
  create,
  getOdpReviewStatus,
  getOneOrNone,
  getReviewStatus,
  getReviewSummary,
  getUnreadMessages,
  update,
}

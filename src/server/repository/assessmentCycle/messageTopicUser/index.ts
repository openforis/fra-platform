import { create } from './create'
import { getOdpReviewStatus } from './getOdpReviewStatus'
import { getOneOrNone } from './getOneOrNone'
import { getReviewStatus } from './getReviewStatus'
import { getReviewSummary } from './getReviewSummary'
import { getUnreadMessages } from './getUnreadMessages'
import { update } from './update'

export const MessageTopicUserRepository = {
  create,
  getOdpReviewStatus,
  getOneOrNone,
  getReviewStatus,
  getReviewSummary,
  getUnreadMessages,
  update,
}

import { create } from './create'
import { getOdpReviewStatus } from './getOdpReviewStatus'
import { getOneOrNone } from './getOneOrNone'
import { getReviewStatus } from './getReviewStatus'
import { getReviewSummary } from './getReviewSummary'
import { getUnreadChatMessages } from './getUnreadChatMessages'
import { getUnreadMessageBoardMessages } from './getUnreadMessageBoardMessages'
import { update } from './update'

export const MessageTopicUserRepository = {
  create,
  getOdpReviewStatus,
  getOneOrNone,
  getReviewStatus,
  getReviewSummary,
  getUnreadChatMessages,
  getUnreadMessageBoardMessages,
  update,
}

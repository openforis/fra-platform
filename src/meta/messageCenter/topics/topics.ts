import { getChatRecipientId } from 'meta/messageCenter/topics/chat'
import { getContactKey } from 'meta/messageCenter/topics/contact'
import { getDataSourceReviewTopicKey } from 'meta/messageCenter/topics/dataSource'
import { getCommentableDescriptionKey } from 'meta/messageCenter/topics/descriptions'
import { getMessageBoardChatKey, getMessageBoardCountryKey } from 'meta/messageCenter/topics/messageBoard'
import {
  getOdpClassReviewTopicKey,
  getOdpReviewTopicKey,
  getOdpReviewTopicKeyPrefix,
} from 'meta/messageCenter/topics/odp'
import { getDataReviewTopicKey } from 'meta/messageCenter/topics/tableData'

export const Topics = {
  getChatRecipientId,
  getCommentableDescriptionKey,
  getContactKey,
  getDataReviewTopicKey,
  getDataSourceReviewTopicKey,
  getMessageBoardChatKey,
  getMessageBoardCountryKey,
  getOdpClassReviewTopicKey,
  getOdpReviewTopicKey,
  getOdpReviewTopicKeyPrefix,
}

import { Row } from '@meta/assessment'
import { User } from '@meta/user'

const getDataReviewTopicKey = (row: Row): string => row.uuid

const getMessageBoardCountryKey = (): string => `message_board`

const getMessageBoardChatKey = (userA: User, userB: User): string => {
  const userKeys = [userA.id, userB.id].sort((idA, idB) => idA - idB).join('_')
  const countryKey = getMessageBoardCountryKey()
  return `${countryKey}_chat_${userKeys}`
}

export const Topics = {
  getDataReviewTopicKey,
  getMessageBoardCountryKey,
  getMessageBoardChatKey,
}

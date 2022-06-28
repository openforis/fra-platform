import { CountryIso } from '@meta/area'
import { Row } from '@meta/assessment'
import { User } from '@meta/user'

const getDataReviewTopicKey = (row: Row): string => row.uuid

const getMessageBoardCountryKey = (countryIso: CountryIso): string => `message_board_${countryIso}`

const getMessageBoardChatKey = (countryIso: CountryIso, userA: User, userB: User): string => {
  const userKeys = [userA.id, userB.id].sort((idA, idB) => idA - idB).join('_')
  const countryKey = getMessageBoardCountryKey(countryIso)
  return `${countryKey}_chat_${userKeys}`
}

export const Topics = {
  getDataReviewTopicKey,
  getMessageBoardCountryKey,
  getMessageBoardChatKey,
}

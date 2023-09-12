import { CountryIso } from 'meta/area'
import { Assessment, Cycle, Row } from 'meta/assessment'
import { User } from 'meta/user'

import { MessageTopic, MessageTopicType } from './messageTopic'

const getDataReviewTopicKey = (row: Row): string => row.uuid

const getOdpReviewTopicKeyPrefix = (odpId: number) => `odp-${odpId}-`

const getOdpClassReviewTopicKey = (odpId: number, uuid: string, rowId: string): string =>
  `${getOdpReviewTopicKeyPrefix(odpId)}class-${uuid}-${rowId}`

const getOdpReviewTopicKey = (odpId: number, rowId: string): string => `${getOdpReviewTopicKeyPrefix(odpId)}${rowId}`

const getMessageBoardCountryKey = (): string => `message_board`

const getMessageBoardChatKey = (userA: User, userB: User): string => {
  const userKeys = [userA.id, userB.id].sort((idA, idB) => idA - idB).join('_')
  const countryKey = getMessageBoardCountryKey()
  return `${countryKey}_chat_${userKeys}`
}

const getCommentableDescriptionKey = (
  countryIso: CountryIso,
  assessment: Assessment,
  cycle: Cycle,
  sectionName: string,
  name: string
): string => `commentable-description-${[countryIso, assessment.props.name, cycle.name, sectionName, name].join('_')}`

const getChatRecipientId = (topic: MessageTopic, sender: User): number | undefined => {
  if (topic.type !== MessageTopicType.chat) return undefined

  const keys = topic.key.split('_')
  const userIds = [Number(keys.pop()), Number(keys.pop())]
  return userIds.find((userId) => userId !== Number(sender.id))
}

export const Topics = {
  getDataReviewTopicKey,
  getOdpReviewTopicKeyPrefix,
  getOdpClassReviewTopicKey,
  getOdpReviewTopicKey,
  getMessageBoardCountryKey,
  getMessageBoardChatKey,
  getCommentableDescriptionKey,
  getChatRecipientId,
}

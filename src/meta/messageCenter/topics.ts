import { CountryIso } from 'meta/area'
import { Assessment, Cycle, Row } from 'meta/assessment'
import { Contact } from 'meta/cycleData'
import { User } from 'meta/user'

import { MessageTopic, MessageTopicType } from './messageTopic'

// table data
const getDataReviewTopicKey = (row: Row): string => row.uuid

// odp
const getOdpReviewTopicKeyPrefix = (odpId: number) => `odp-${odpId}-`

const getOdpClassReviewTopicKey = (odpId: number, uuid: string, rowId: string): string =>
  `${getOdpReviewTopicKeyPrefix(odpId)}class-${uuid}-${rowId}`

const getOdpReviewTopicKey = (odpId: number, rowId: string): string => `${getOdpReviewTopicKeyPrefix(odpId)}${rowId}`

// message board
const getMessageBoardCountryKey = (): string => `message_board`

const getMessageBoardChatKey = (userA: User, userB: User): string => {
  const userKeys = [userA.id, userB.id].sort((idA, idB) => idA - idB).join('_')
  const countryKey = getMessageBoardCountryKey()
  return `${countryKey}_chat_${userKeys}`
}

const getChatRecipientId = (topic: MessageTopic, sender: User): number | undefined => {
  if (topic.type !== MessageTopicType.chat) return undefined

  const keys = topic.key.split('_')
  const userIds = [Number(keys.pop()), Number(keys.pop())]
  return userIds.find((userId) => userId !== Number(sender.id))
}

// descriptions
const getCommentableDescriptionKey = (
  countryIso: CountryIso,
  assessment: Assessment,
  cycle: Cycle,
  sectionName: string,
  name: string
): string => `commentable-description-${[countryIso, assessment.props.name, cycle.name, sectionName, name].join('_')}`

// contacts
const getContactKey = (contact: Contact): string => `contact_${contact.uuid}`

export const Topics = {
  getChatRecipientId,
  getCommentableDescriptionKey,
  getContactKey,
  getDataReviewTopicKey,
  getMessageBoardChatKey,
  getMessageBoardCountryKey,
  getOdpClassReviewTopicKey,
  getOdpReviewTopicKey,
  getOdpReviewTopicKeyPrefix,
}

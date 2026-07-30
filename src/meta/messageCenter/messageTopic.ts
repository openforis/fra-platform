import { CountryIso } from 'meta/area/countryIso'
import { Message } from 'meta/messageCenter/message'
import { UUID } from 'meta/uuid/uuid'

export enum MessageTopicStatus {
  opened = 'opened',
  resolved = 'resolved',
}

export enum MessageTopicType {
  review = 'review',
  chat = 'chat',
  messageBoard = 'messageBoard',
}

export interface MessageTopic {
  id: number
  uuid: UUID
  countryIso: CountryIso
  key: string
  status: MessageTopicStatus
  type: MessageTopicType
  // derived props
  title?: string
  subtitle?: string
  messages?: Array<Message>
  loading?: boolean
}

import { CountryIso } from 'meta/area'

import { Message } from './message'

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

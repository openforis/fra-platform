import { CountryIso } from '@meta/area'
import { User } from '@meta/user'

export enum MessageTopicStatus {
  opened = 'opened',
  resolved = 'resolved',
}

export interface Message {
  id: number
  topicId: number
  userId: number
  message: string
  deleted: boolean
  createdTime: string
  user?: User
}

export interface MessageTopic {
  id: number
  countryIso: CountryIso
  assessmentId: number
  cycleUuid: string
  key: string
  status: MessageTopicStatus
  messages?: Array<Message>
}

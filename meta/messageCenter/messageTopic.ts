import { CountryIso } from '@meta/area'
import { Message } from './message'

export enum MessageTopicStatus {
  opened = 'opened',
  resolved = 'resolved',
}

export interface MessageTopic {
  id: number
  countryIso: CountryIso
  assessmentId: number
  cycleId: number
  key: string
  status: MessageTopicStatus
  title?: string
  messages?: Array<Message>
}

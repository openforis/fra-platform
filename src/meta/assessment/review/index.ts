import { MessageTopicStatus } from 'meta/messageCenter/messageTopic'
import { UUID } from 'meta/uuid'

export interface ReviewStatus {
  hasUnreadMessages: boolean
  key?: string
  lastMessageUserId?: number
  messagesCount?: number
  status: MessageTopicStatus
}

export interface ReviewSummary {
  hasUnreadMessages: boolean
  lastMessageCreatedTime: string
  lastOpenTime: string
  parentUuid: UUID
  status: MessageTopicStatus
  subSectionUuid: UUID
}

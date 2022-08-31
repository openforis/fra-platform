import { MessageTopicStatus } from '../messageCenter'

export interface ReviewStatus {
  key?: string
  hasUnreadMessages: boolean
  status: MessageTopicStatus
  messagesCount?: number
  lastMessageUserId?: number
}

export interface ReviewSummary {
  parentId: number
  subSectionId: number
  hasUnreadMessages: boolean
  status: MessageTopicStatus
  lastMessageCreatedTime: string
  lastOpenTime: string
}

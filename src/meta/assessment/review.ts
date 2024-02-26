import { MessageTopicStatus } from '../messageCenter'

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
  parentId: number
  status: MessageTopicStatus
  subSectionId: number
}

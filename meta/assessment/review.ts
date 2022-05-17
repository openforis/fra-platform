import { MessageTopicStatus } from '../messageCenter'

export interface ReviewStatus {
  key?: string
  hasUnreadMessages: boolean
  status: MessageTopicStatus
  messagesCount?: number
  lastMessageUserId?: number
}

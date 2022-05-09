import { MessageTopicStatus } from '../messageCenter'

export interface ReviewStatus {
  key: string
  status: MessageTopicStatus
  messagesCount: number
  lastMessageTime: number
  lastMessageUserId: number
  lastOpenTime: number
}

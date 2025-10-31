import { apiPath } from 'meta/api/endpoint/_utils'

export const MessageCenter = {
  topic: (): string => apiPath('message-center', 'topic'),
  topicMessage: (): string => apiPath('message-center', 'topic', 'message'),
  topicResolve: (): string => apiPath('message-center', 'topic', 'resolve'),
  topicUnreadMessages: (): string => apiPath('message-center', 'topic', 'unread-messages'),
}

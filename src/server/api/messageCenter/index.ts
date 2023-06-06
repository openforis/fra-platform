import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { AuthMiddleware } from 'server/middleware/auth'

import { addMessage } from './addMessage'
import { getTopic } from './getTopic'
import { getUnreadMessages } from './getUnreadMessages'
import { markMessageDeleted } from './markMessageDeleted'
import { resolveTopic } from './resolveTopic'

export const MessageCenterApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.MessageCenter.topic(), AuthMiddleware.requireEditMessageTopic, getTopic)
    express.post(ApiEndPoint.MessageCenter.topicMessage(), AuthMiddleware.requireEditMessageTopic, addMessage)
    express.delete(ApiEndPoint.MessageCenter.topicMessage(), AuthMiddleware.requireDeleteTopicMessage, markMessageDeleted)
    express.get(ApiEndPoint.MessageCenter.topicUnreadMessages(), getUnreadMessages)
    express.put(ApiEndPoint.MessageCenter.topicResolve(), AuthMiddleware.requireResolveTopic, resolveTopic)
  },
}

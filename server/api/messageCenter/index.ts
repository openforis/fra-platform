import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { AuthMiddleware } from '@server/middleware/auth'

import { addMessage } from './addMessage'
import { getCountryMessageBoardUnreadMessages } from './getCountryMessageBoardUnreadMessages'
import { getTopic } from './getTopic'
import { markMessageDeleted } from './markMessageDeleted'
import { resolveTopic } from './resolveTopic'

export const MessageCenterApi = {
  init: (express: Express): void => {
    express.get(
      ApiEndPoint.MessageCenter.Stats.getCountryMessageBoardUnreadMessages(),
      getCountryMessageBoardUnreadMessages
    )
    express.get(ApiEndPoint.MessageCenter.Topic.get(), AuthMiddleware.requireEditMessageTopic, getTopic)
    express.post(ApiEndPoint.MessageCenter.Topic.getMessage(), AuthMiddleware.requireEditMessageTopic, addMessage)
    express.delete(
      ApiEndPoint.MessageCenter.Topic.getMessage(),
      AuthMiddleware.requireDeleteTopicMessage,
      markMessageDeleted
    )
    express.put(ApiEndPoint.MessageCenter.Topic.resolveTopic(), AuthMiddleware.requireResolveTopic, resolveTopic)
  },
}

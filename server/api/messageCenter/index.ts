import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { AuthMiddleware } from '@server/middleware/auth'

import { addMessage } from './addMessage'
import { getTopic } from './getTopic'
import { resolveTopic } from './resolveTopic'

export const MessageCenterApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.MessageCenter.Topic.get(), AuthMiddleware.requireEditMessageTopic, getTopic)
    express.post(ApiEndPoint.MessageCenter.Topic.addMessage(), AuthMiddleware.requireEditMessageTopic, addMessage)
    express.put(ApiEndPoint.MessageCenter.Topic.resolveTopic(), AuthMiddleware.requireResolveTopic, resolveTopic)
  },
}

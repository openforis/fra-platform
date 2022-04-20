import { ApiEndPoint } from '@common/api/endpoint'
import { AuthMiddleware } from '@server/middleware/auth'
import { Express } from 'express'

import { addMessage } from './addMessage'
import { getTopic } from './getTopic'

export const MessageCenterApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.MessageCenter.Topic.get(), AuthMiddleware.requireEditMessageTopic, getTopic)
    express.post(ApiEndPoint.MessageCenter.Topic.addMessage(), AuthMiddleware.requireEditMessageTopic, addMessage)
  },
}

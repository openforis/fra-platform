import { Express } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { getTopic } from './getTopic'
import { addMessage } from './addMessage'

export const MessageCenterApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.MessageCenter.Topic.get(), getTopic)
    express.post(ApiEndPoint.MessageCenter.Topic.addMessage(), addMessage)
  },
}

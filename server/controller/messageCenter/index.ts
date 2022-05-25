import { addMessage } from './addMessage'
import { getTopic } from './getTopic'
import { markMessageDeleted } from './markMessageDeleted'
import { updateTopicReadTime } from './updateTopicReadTime'
import { updateTopicStatus } from './updateTopicStatus'

export const MessageCenterController = {
  addMessage,
  getTopic,
  updateTopicReadTime,
  updateTopicStatus,
  markMessageDeleted,
}

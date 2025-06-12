import { addMessage } from 'client/store/messageCenter/actions/addMessage'
import { changeStatus } from 'client/store/messageCenter/actions/changeStatus'
import { closeTopic } from 'client/store/messageCenter/actions/closeTopic'
import { deleteMessage } from 'client/store/messageCenter/actions/deleteMessage'
import { markMessageDeleted } from 'client/store/messageCenter/actions/markMessageDeleted'
import { openTopic } from 'client/store/messageCenter/actions/openTopic'
import { postMessage } from 'client/store/messageCenter/actions/postMessage'
import { reset } from 'client/store/messageCenter/actions/reset'
import { resolveTopic } from 'client/store/messageCenter/actions/resolveTopic'

export const MessageCenterActions = {
  addMessage,
  changeStatus,
  closeTopic,
  deleteMessage,
  markMessageDeleted,
  openTopic,
  postMessage,
  reset,
  resolveTopic,
}

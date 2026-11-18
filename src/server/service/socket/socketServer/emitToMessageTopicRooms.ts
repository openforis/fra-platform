import { Cycle } from 'meta/assessment/cycle'
import { MessageTopic } from 'meta/messageCenter/messageTopic'

import { SocketRooms } from 'server/service/socket/socketRooms'

import { emitToRooms } from './emitToRooms'

export const emitToMessageTopicRooms = (
  props: { cycle: Cycle; eventName: string; topic: MessageTopic },
  ...args: Array<unknown>
): void => {
  const { cycle, eventName, topic } = props
  const rooms = SocketRooms.getMessageTopicRooms({ cycle, topic })
  emitToRooms({ eventName, rooms }, ...args)
}

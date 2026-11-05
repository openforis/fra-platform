import { emit } from './emit'
import { emitToCountryRooms } from './emitToCountryRooms'
import { emitToMessageTopicRooms } from './emitToMessageTopicRooms'
import { init } from './init'

export const SocketServer = {
  init,
  emit,
  emitToCountryRooms,
  emitToMessageTopicRooms,
}

import { emitToAdminRooms } from './emitToAdminRooms'
import { emitToCountryRooms } from './emitToCountryRooms'
import { emitToMessageTopicRooms } from './emitToMessageTopicRooms'
import { init } from './init'

export const SocketServer = {
  init,
  emitToAdminRooms,
  emitToCountryRooms,
  emitToMessageTopicRooms,
}

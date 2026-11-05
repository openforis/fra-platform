import { emit } from './emit'
import { emitExcept } from './emitExcept'
import { emitToCountryRooms } from './emitToCountryRooms'
import { init } from './init'

export const SocketServer = {
  init,
  emit,
  emitExcept,
  emitToCountryRooms,
}

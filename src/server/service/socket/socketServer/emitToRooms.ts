import { Objects } from 'utils/objects'

import { SocketIoServer } from './socketIoServer'

export const emitToRooms = (
  props: { eventName: string; rooms: Array<string>; socketId?: string },
  ...args: Array<unknown>
): void => {
  const { eventName, rooms, socketId } = props
  // socket.io sends to every client when the room list is empty
  if (Objects.isEmpty(rooms)) return

  const io = SocketIoServer.getInstance()
  const target = socketId ? io.to(rooms).except(socketId) : io.to(rooms)
  target.emit(eventName, args)
}

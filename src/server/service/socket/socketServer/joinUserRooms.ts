import { Request } from 'express'
import { Socket } from 'socket.io'

import { SocketRooms } from 'server/service/socket/socketRooms/socketRooms'
import { Requests } from 'server/utils'

export const joinUserRooms = (socket: Socket, next: (err?: Error) => void): void => {
  // SocketServer.init sets the user on the handshake request
  const user = Requests.getUser(socket.request as Request)

  // Logged-out sockets join no room and only get the events sent to everyone
  if (user) socket.join(SocketRooms.getUserRooms(user))

  next()
}

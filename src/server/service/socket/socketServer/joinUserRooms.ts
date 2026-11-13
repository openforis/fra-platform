import { Request } from 'express'
import { Socket } from 'socket.io'

import { SocketRooms } from 'server/service/socket/socketRooms'
import { Requests } from 'server/utils'

export const joinUserRooms = (socket: Socket, next: (err?: Error) => void): void => {
  const user = Requests.getUser(socket.request as Request)

  // Logged-out sockets still get the events sent to everyone
  if (user) socket.join(SocketRooms.getUserRooms(user))

  next()
}

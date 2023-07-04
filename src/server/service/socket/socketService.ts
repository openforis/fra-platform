import { Server as HttpServer } from 'http'
import { Server } from 'socket.io'

import { ProcessEnv } from 'server/utils'

let io: Server

const init = (server: HttpServer): void => {
  io = new Server(server, {
    cors: {
      origin: ProcessEnv.appUri,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
    allowEIO3: true,
  })

  // io.on('connection', (socket: any) => {
  //   console.log('==== NEW CONNECTION', socket)
  // })
}

const emit = (event: string, ...args: any[]) => {
  io.emit(event, args)
}

export const SocketServer = {
  init,
  emit,
}

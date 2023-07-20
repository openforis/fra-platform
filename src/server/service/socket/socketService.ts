import * as http from 'http'
import { Server } from 'socket.io'

import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

let io: Server

const init = (server: http.Server): void => {
  io = new Server(server, {
    cors: {
      origin: ProcessEnv.appUri,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    // transports: ['websocket', 'polling'],
  })

  // io.on('connection', (socket: any) => {
  //   console.log('==== NEW CONNECTION', socket)
  // })

  io.engine.on('connection_error', (err: any) => {
    Logger.error(`WebSocket connection error. Code: ${err.code}. Message: ${err.message}.`)
  })
}

const emit = (event: string, ...args: any[]) => {
  io.emit(event, args)
}

export const SocketServer = {
  init,
  emit,
}

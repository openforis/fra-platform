import http from 'http'
import { createAdapter } from '@socket.io/redis-streams-adapter'
import { Server } from 'socket.io'

import { RedisQueueClient } from 'server/service/redis/queueClient'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

let io: Server

const init = async (server: http.Server): Promise<void> => {
  io = new Server(server, {
    adapter: createAdapter(RedisQueueClient.getInstance()),
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

  io.engine.on('connection_error', (err) => {
    Logger.error(`WebSocket connection error. Code: ${err.code}. Message: ${err.message}.`)
  })
}

const emit = (event: string, ...args: Array<any>): void => {
  io.emit(event, args)
}

export const SocketServer = {
  init,
  emit,
}

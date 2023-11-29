import * as http from 'http'
import { createAdapter } from '@socket.io/redis-streams-adapter'
import { createClient } from 'redis'
import { Server } from 'socket.io'

import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

let io: Server
// let emitter: Emitter

const init = async (server: http.Server): Promise<void> => {
  const clientAdapter = createClient({ url: ProcessEnv.redisQueueUrl })
  await clientAdapter.connect()

  io = new Server(server, {
    adapter: createAdapter(clientAdapter),
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

const emit = (event: string, ...args: any[]) => {
  io.emit(event, args)
}

export const SocketServer = {
  init,
  emit,
}

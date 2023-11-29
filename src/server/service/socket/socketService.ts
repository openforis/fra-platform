import * as http from 'http'
import { createAdapter } from '@socket.io/redis-adapter'
import { Emitter } from '@socket.io/redis-emitter'
import IORedis from 'ioredis'
import { Server } from 'socket.io'

import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

let io: Server
const emitterClient = new IORedis(ProcessEnv.redisQueueUrl)
const emitter = new Emitter(emitterClient)

const init = (server: http.Server): void => {
  io = new Server(server, {
    cors: {
      origin: ProcessEnv.appUri,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    // transports: ['websocket', 'polling'],
  })

  const pubClient = new IORedis(ProcessEnv.redisQueueUrl)
  const subClient = pubClient.duplicate()
  io.adapter(createAdapter(pubClient, subClient))

  // io.on('connection', (socket: any) => {
  //   console.log('==== NEW CONNECTION', socket)
  // })

  io.engine.on('connection_error', (err) => {
    Logger.error(`WebSocket connection error. Code: ${err.code}. Message: ${err.message}.`)
  })
}

const emit = (event: string, ...args: any[]) => {
  emitter.emit(event, args)
}

export const SocketServer = {
  init,
  emit,
}

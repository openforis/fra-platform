import http from 'http'
import { createAdapter } from '@socket.io/redis-streams-adapter'
import { Server } from 'socket.io'

import { RedisQueueClient } from 'server/service/redis/queueClient'
import { ProcessEnv } from 'server/utils'

export class SocketIoServer {
  static #instance: Server

  static newInstance(server: http.Server): Server {
    SocketIoServer.#instance = new Server(server, {
      adapter: createAdapter(RedisQueueClient.getInstance()),
      cors: {
        origin: ProcessEnv.appUri,
        methods: ['GET', 'POST'],
        credentials: true,
      },
      // transports: ['websocket', 'polling'],
    })
    return SocketIoServer.#instance
  }

  static getInstance(): Server {
    return SocketIoServer.#instance
  }
}

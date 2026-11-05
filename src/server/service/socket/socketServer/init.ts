import http from 'http'
import cookieParser from 'cookie-parser'
import { RequestHandler } from 'express'

import { Logger } from 'server/utils/logger'

import { joinUserRooms } from './joinUserRooms'
import { onlyHandshake } from './onlyHandshake'
import { SocketIoServer } from './socketIoServer'

type InitOptions = {
  authenticate?: RequestHandler
}

export const init = async (server: http.Server, options: InitOptions = {}): Promise<void> => {
  const { authenticate } = options

  const io = SocketIoServer.newInstance(server)

  // io.on('connection', (socket: any) => {
  //   console.log('==== NEW CONNECTION', socket)
  // })

  if (authenticate) {
    io.engine.use(onlyHandshake(cookieParser()))
    io.engine.use(onlyHandshake(authenticate))
    io.use(joinUserRooms)
  }

  io.engine.on('connection_error', (err) => {
    Logger.error(`WebSocket connection error. Code: ${err.code}. Message: ${err.message}.`)
  })
}

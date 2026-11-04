import http from 'http'
import { createAdapter } from '@socket.io/redis-streams-adapter'
import cookieParser from 'cookie-parser'
import { RequestHandler } from 'express'
import { Server } from 'socket.io'

import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'
import { Objects } from 'utils/objects'

import { RedisQueueClient } from 'server/service/redis/queueClient'
import { SocketRooms } from 'server/service/socket/socketRooms'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

import { joinUserRooms } from './joinUserRooms'
import { onlyHandshake } from './onlyHandshake'

type InitOptions = {
  // Sets req.user from the auth cookie, passed by the app server only
  authenticate?: RequestHandler
}

let io: Server

const init = async (server: http.Server, options: InitOptions = {}): Promise<void> => {
  const { authenticate } = options

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

  if (authenticate) {
    // Reads the user from the auth cookie at the handshake and puts the socket in that user's rooms
    io.engine.use(onlyHandshake(cookieParser()))
    io.engine.use(onlyHandshake(authenticate))
    io.use(joinUserRooms)
  }

  io.engine.on('connection_error', (err) => {
    Logger.error(`WebSocket connection error. Code: ${err.code}. Message: ${err.message}.`)
  })
}

const emit = (event: string, ...args: Array<any>): void => {
  io.emit(event, args)
}

// Emit to all clients but the one that made the change (all clients when socketId is missing)
const emitExcept = (props: { eventName: string; socketId?: string }, ...args: Array<unknown>): void => {
  const { eventName, socketId } = props
  const target = socketId ? io.except(socketId) : io
  target.emit(eventName, args)
}

// Emit to the clients in the rooms but the one that made the change (all of them when socketId is missing)
const emitToRooms = (
  props: { eventName: string; rooms: Array<string>; socketId?: string },
  ...args: Array<unknown>
): void => {
  const { eventName, rooms, socketId } = props
  // socket.io sends to every client when the room list is empty
  if (Objects.isEmpty(rooms)) return

  const target = socketId ? io.to(rooms).except(socketId) : io.to(rooms)
  target.emit(eventName, args)
}

// Emit to the country's users and the admins but the one that made the change (all of them when socketId is missing)
const emitToCountryRooms = (
  props: { countryIso: CountryIso; cycle: Cycle; eventName: string; socketId?: string },
  ...args: Array<unknown>
): void => {
  const { countryIso, cycle, eventName, socketId } = props
  const rooms = SocketRooms.getCountryRooms({ countryIso, cycle })
  emitToRooms({ eventName, rooms, socketId }, ...args)
}

export const SocketServer = {
  init,
  emit,
  emitExcept,
  emitToCountryRooms,
}

import { Server } from 'socket.io'

// The socket.io server, set by init
let io: Server

export const getIo = (): Server => io

export const setIo = (server: Server): void => {
  io = server
}

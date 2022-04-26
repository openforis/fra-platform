import { Server as HttpServer } from 'http'
import { Server } from 'socket.io'

let io: Server

const init = (server: HttpServer): void => {
  io = new Server(server)

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

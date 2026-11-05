import { SocketIoServer } from './socketIoServer'

// Emit to every client except the one that made the change, or to every client when socketId is missing
export const emitExcept = (props: { eventName: string; socketId?: string }, ...args: Array<unknown>): void => {
  const { eventName, socketId } = props
  const io = SocketIoServer.getInstance()
  const target = socketId ? io.except(socketId) : io
  target.emit(eventName, args)
}

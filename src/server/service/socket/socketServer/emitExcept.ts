import { SocketIoServer } from './socketIoServer'

export const emitExcept = (props: { eventName: string; socketId?: string }, ...args: Array<unknown>): void => {
  const { eventName, socketId } = props
  const io = SocketIoServer.getInstance()
  const target = socketId ? io.except(socketId) : io
  target.emit(eventName, args)
}

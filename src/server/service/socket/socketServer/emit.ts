import { SocketIoServer } from './socketIoServer'

export const emit = (event: string, ...args: Array<any>): void => {
  SocketIoServer.getInstance().emit(event, args)
}

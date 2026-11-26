import { SocketRooms } from 'server/service/socket/socketRooms'

import { emitToRooms } from './emitToRooms'

export const emitToAdminRooms = (props: { eventName: string }, ...args: Array<unknown>): void => {
  const { eventName } = props
  const rooms = SocketRooms.getAdminRooms()
  emitToRooms({ eventName, rooms }, ...args)
}

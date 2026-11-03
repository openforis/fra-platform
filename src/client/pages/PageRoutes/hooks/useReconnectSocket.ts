import { useEffect, useRef } from 'react'

import { User } from 'meta/user/user'

import { useUser } from 'client/store/user/hooks/user'
import { SocketClient } from 'client/service/socket/client'

// Built from the same user id and roles the server uses for the socket rooms
const getRoomsKey = (user: User | undefined): string => {
  if (!user) return ''

  const roleKeys = user.roles.map<string>((role) => `${role.role}-${role.cycleUuid}-${role.countryIso}`).sort()
  return [String(user.id), ...roleKeys].join(',')
}

export const useReconnectSocket = (): void => {
  const user = useUser()
  const roomsKey = getRoomsKey(user)
  const connectedRoomsKey = useRef(roomsKey)

  // The server sets the rooms only when the socket connects
  useEffect(() => {
    const areRoomsOutdated = connectedRoomsKey.current !== roomsKey
    if (!areRoomsOutdated) return

    connectedRoomsKey.current = roomsKey
    SocketClient.reconnect()
  }, [roomsKey])
}

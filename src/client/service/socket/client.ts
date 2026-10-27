import axios from 'axios'
import io, { Socket } from 'socket.io-client'

type EventHandler = (...args: Array<unknown>) => void | Promise<void>

let socket: Socket = null

/**
 * Intercept every request and add the socket ID in the headers (using key "socketid").
 * The server uses it to skip the sender when notifying clients of the change.
 */
axios.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  if (socket?.id) config.headers.socketid = socket.id
  return config
})

const open = (): void => {
  socket = io(window.location.origin, {
    withCredentials: true,
  })
}

export const close = (): void => {
  socket?.close()

  socket = null
}

const on = (eventName: string, eventHandler: EventHandler): Socket => {
  return socket?.on(eventName, eventHandler)
}

const off = (eventName: string, eventHandler: EventHandler): Socket => {
  return socket?.off(eventName, eventHandler)
}

export const SocketClient = {
  open,
  close,
  on,
  off,
}

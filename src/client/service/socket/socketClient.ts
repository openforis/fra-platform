// import axios from 'axios'
import io, { Socket } from 'socket.io-client'

type EventHandler = (...args: any[]) => void | Promise<void>

let socket: Socket = null

/**
 * Intercept every request and add the socket ID in the headers (using key "socketid").
 */
// const _addSocketIdToEveryRequest = () => {
//   axios.interceptors.request.use((config) => {
//     // eslint-disable-next-line no-param-reassign
//     config.headers.socketid = socket.id
//     return config
//   })
// }

const open = () => {
  // const throwError = (error) => {
  //   throwErrorFn(error)
  //   closeSocket()
  // }
  socket = io(window.location.origin, {
    withCredentials: true,
  })

  // on(WebSocketEvents.connectError, (error) => throwError(error.stack))
  // on(WebSocketEvents.error, throwError)

  // _addSocketIdToEveryRequest()
}

export const close = () => {
  socket?.close()

  socket = null
}

const on = (eventName: string, eventHandler: EventHandler) => socket?.on(eventName, eventHandler)

const off = (eventName: string, eventHandler: EventHandler) => socket?.off(eventName, eventHandler)

// export const openSocket = async (throwErrorFn) => {

export const SocketClient = {
  open,
  close,
  on,
  off,
}

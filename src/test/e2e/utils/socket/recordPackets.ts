import { type Page } from '@playwright/test'

export type ReceivedSocketPackets = {
  connects: Array<string>
  eventNames: Array<string>
}

const _socketIoPath = '/socket.io/'
const _packetSeparator = '\x1e'
const _connectPacketType = '40'
const _eventPacketType = '42'

const _addPacket = (packets: ReceivedSocketPackets, packet: string): void => {
  if (packet.startsWith(_connectPacketType)) {
    packets.connects.push(packet)
    return
  }
  if (packet.startsWith(_eventPacketType)) {
    const [eventName] = JSON.parse(packet.slice(_eventPacketType.length)) as [string]
    packets.eventNames.push(eventName)
  }
}

// Call this function before goto, or the connect packet is missed
export const recordPackets = (page: Page): ReceivedSocketPackets => {
  const packets: ReceivedSocketPackets = { connects: [], eventNames: [] }

  page.on('websocket', (webSocket) => {
    if (!webSocket.url().includes(_socketIoPath)) return
    webSocket.on('framereceived', ({ payload }) => {
      _addPacket(packets, payload.toString())
    })
  })

  page.on('response', async (response) => {
    const isPolling = response.url().includes(_socketIoPath) && response.request().method() === 'GET'
    if (!isPolling) return
    try {
      const body = await response.text()
      body.split(_packetSeparator).forEach((packet) => {
        _addPacket(packets, packet)
      })
    } catch {
      // text() throws if the page closes first, and an error thrown in a listener fails the test
    }
  })

  return packets
}

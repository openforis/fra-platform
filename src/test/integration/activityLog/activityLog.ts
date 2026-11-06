import { vi } from 'vitest'

import { SocketServer } from 'server/service/socket'

import nationalDataPoint from 'test/integration/activityLog/nationalDataPoint/nationalDataPoint'

export default (): void => {
  describe('Activity log', () => {
    // Mock sockets
    beforeAll(() => {
      vi.spyOn(SocketServer, 'emit').mockImplementation((): void => undefined)
      vi.spyOn(SocketServer, 'emitExcept').mockImplementation((): void => undefined)
    })

    afterAll(() => {
      vi.restoreAllMocks()
    })

    nationalDataPoint()
  })
}

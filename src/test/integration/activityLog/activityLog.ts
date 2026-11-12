import { vi } from 'vitest'

import { FileStorage } from 'server/service/fileStorage/fileStorage'
import { SocketServer } from 'server/service/socket'

import assessment from 'test/integration/activityLog/assessment/assessment'
import country from 'test/integration/activityLog/country/country'
import metadata from 'test/integration/activityLog/metadata/metadata'
import nationalDataPoint from 'test/integration/activityLog/nationalDataPoint/nationalDataPoint'

export default (): void => {
  describe('Activity log', () => {
    beforeAll(() => {
      // Mock sockets
      vi.spyOn(SocketServer, 'emit').mockImplementation((): void => undefined)
      vi.spyOn(SocketServer, 'emitExcept').mockImplementation((): void => undefined)
      // Mock file storage (S3)
      vi.spyOn(FileStorage.Directory, 'copy').mockResolvedValue(undefined)
      vi.spyOn(FileStorage.Directory, 'remove').mockResolvedValue(undefined)
    })

    afterAll(() => {
      vi.restoreAllMocks()
    })

    nationalDataPoint()
    metadata()
    assessment()
    country()
  })
}

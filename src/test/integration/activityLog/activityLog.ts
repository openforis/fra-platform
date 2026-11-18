import { vi } from 'vitest'

import { FileStorage } from 'server/service/fileStorage/fileStorage'
import { SocketServer } from 'server/service/socket'

import assessment from 'test/integration/activityLog/assessment/assessment'
import contact from 'test/integration/activityLog/contact/contact'
import country from 'test/integration/activityLog/country/country'
import description from 'test/integration/activityLog/description/description'
import file from 'test/integration/activityLog/file/file'
import link from 'test/integration/activityLog/link/link'
import linksCheck from 'test/integration/activityLog/linksCheck/linksCheck'
import messageCenter from 'test/integration/activityLog/messageCenter/messageCenter'
import metadata from 'test/integration/activityLog/metadata/metadata'
import nationalDataPoint from 'test/integration/activityLog/nationalDataPoint/nationalDataPoint'
import repository from 'test/integration/activityLog/repository/repository'
import tableData from 'test/integration/activityLog/tableData/tableData'
import user from 'test/integration/activityLog/user/user'
import userAccount from 'test/integration/activityLog/userAccount/userAccount'
import userRole from 'test/integration/activityLog/userRole/userRole'

export default (): void => {
  describe('Activity log', () => {
    beforeAll(() => {
      // Mock sockets
      vi.spyOn(SocketServer, 'emitToAdminRooms').mockImplementation((): void => undefined)
      vi.spyOn(SocketServer, 'emitToCountryRooms').mockImplementation((): void => undefined)
      vi.spyOn(SocketServer, 'emitToMessageTopicRooms').mockImplementation((): void => undefined)
      // Mock file storage (S3)
      vi.spyOn(FileStorage.Directory, 'copy').mockResolvedValue(undefined)
      vi.spyOn(FileStorage.Directory, 'remove').mockResolvedValue(undefined)
      vi.spyOn(FileStorage.File, 'upload').mockResolvedValue(undefined)
    })

    afterAll(() => {
      vi.restoreAllMocks()
    })

    nationalDataPoint()
    metadata()
    assessment()
    contact()
    repository()
    messageCenter()
    user()
    userRole()
    userAccount()
    file()
    linksCheck()
    link()
    description()
    tableData()
    country()
  })
}

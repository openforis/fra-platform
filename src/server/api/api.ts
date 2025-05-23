import { Express } from 'express'

import { ExtDataApi } from 'server/api/extData'
import { ApiContextMiddleware } from 'server/middleware/apiContext'

import { AdminApi } from './admin'
import { AreaApi } from './area'
import { AuthApi } from './auth'
import { CycleDataApi } from './cycleData'
import { DefinitionApi } from './definitions'
import { ExplorerApi } from './explorer'
import { FileApi } from './file'
import { GeoApi } from './geo'
import { InitApi } from './init'
import { KioskApi } from './kiosk'
import { MessageCenterApi } from './messageCenter'
import { MetadataApi } from './metadata'
import { UserApi } from './user'

/**
 * API Controller
 * Initialize APIs here
 */

export const Api = {
  init: (express: Express): void => {
    express.use('/api*', ApiContextMiddleware.initContext)

    AuthApi.init(express)

    InitApi.init(express)
    AdminApi.init(express)
    AreaApi.init(express)
    CycleDataApi.init(express)
    DefinitionApi.init(express)
    ExtDataApi.init(express)
    FileApi.init(express)
    UserApi.init(express)
    MessageCenterApi.init(express)
    MetadataApi.init(express)
    GeoApi.init(express)
    KioskApi.init(express)
    ExplorerApi.init(express)
  },
}

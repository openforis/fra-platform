import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { NationalDataPointApi } from 'server/api/cycleData/nationalDataPoint'
import { ExtDataApi } from 'server/api/extData'
import { ApiContextMiddleware } from 'server/middleware/apiContext'
import Requests from 'server/utils/requests'

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
    // context middleware applied to all api endpoints
    express.use('/api/*path', ApiContextMiddleware.initContext)

    // health system staus endpoint
    express.use(ApiEndPoint.health(), (_req, res) => Requests.sendOk(res, { staus: 'ok' }))

    // init all endpoints
    AuthApi.init(express)
    AdminApi.init(express)
    AreaApi.init(express)
    CycleDataApi.init(express)
    DefinitionApi.init(express)
    ExplorerApi.init(express)
    ExtDataApi.init(express)
    FileApi.init(express)
    GeoApi.init(express)
    InitApi.init(express)
    KioskApi.init(express)
    MessageCenterApi.init(express)
    MetadataApi.init(express)
    UserApi.init(express)
    // cycle data apis
    NationalDataPointApi.init(express)
  },
}

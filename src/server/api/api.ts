import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { ActivitiesApi } from 'server/api/cycleData/activities'
import { ContactsApi } from 'server/api/cycleData/contacts'
import { DashboardApi } from 'server/api/cycleData/dashboard'
import { DescriptionsApi } from 'server/api/cycleData/descriptions'
import { HistoryApi } from 'server/api/cycleData/history'
import { NationalDataPointApi } from 'server/api/cycleData/nationalDataPoint'
import { ReviewApi } from 'server/api/cycleData/review'
import { TableDataApi } from 'server/api/cycleData/table'
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
    ActivitiesApi.init(express)
    ContactsApi.init(express)
    DashboardApi.init(express)
    DescriptionsApi.init(express)
    HistoryApi.init(express)
    NationalDataPointApi.init(express)
    ReviewApi.init(express)
    TableDataApi.init(express)
  },
}

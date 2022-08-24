import { Express } from 'express'

import { AreaApi } from './area'
import { AssessmentApi } from './assessment'
import { AuthApi } from './auth'
import { CycleDataApi } from './cycleData'
import { DefinitionApi } from './definitions'
import { FileApi } from './file'
import { GeoApi } from './geo'
import { InitApi } from './init'
import { MessageCenterApi } from './messageCenter'
import { UserApi } from './user'

/**
 * API Controller
 * Initialize APIs here
 */

export const Api = {
  init: (express: Express): void => {
    InitApi.init(express)
    AreaApi.init(express)
    AuthApi.init(express)
    AssessmentApi.init(express)
    CycleDataApi.init(express)
    DefinitionApi.init(express)
    FileApi.init(express)
    UserApi.init(express)
    MessageCenterApi.init(express)
    GeoApi.init(express)
  },
}

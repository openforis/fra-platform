import { Express } from 'express'

import { AssessmentApi } from '@server/api/assessment'
import { AuthApi } from '@server/api/auth'
import { CycleDataApi } from '@server/api/cycleData'
import { DefinitionApi } from '@server/api/definitions'
import { FileApi } from '@server/api/file'
import { GeoApi } from '@server/api/geo'
import { InitApi } from '@server/api/init'
import { MessageCenterApi } from '@server/api/messageCenter'
import { UserApi } from '@server/api/user'

/**
 * API Controller
 * Initialize APIs here
 */

export const Api = {
  init: (express: Express): void => {
    InitApi.init(express)
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

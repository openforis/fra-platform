import { Express } from 'express'

import { AssessmentApi } from '@server/api/assessment'
import { AuthApi } from '@server/api/auth'
import { DefinitionApi } from '@server/api/definitions'
import { FileApi } from '@server/api/file'
import { InitApi } from '@server/api/init'
import { MessageCenterApi } from '@server/api/messageCenter'
import { UserApi } from '@server/api/user'
import { GeoApi } from '@server/api/geo'

/**
 * API Controller
 * Initialize APIs here
 */

export const Api = {
  init: (express: Express): void => {
    InitApi.init(express)
    AuthApi.init(express)
    AssessmentApi.init(express)
    DefinitionApi.init(express)
    FileApi.init(express)
    UserApi.init(express)
    MessageCenterApi.init(express)
    GeoApi.init(express)
  },
}

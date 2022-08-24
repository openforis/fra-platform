import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { init } from '@server/api/init/init'

export const InitApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.init(), init)
  },
}

import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { init } from 'server/api/init/init'

export const InitApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.init(), init)
  },
}

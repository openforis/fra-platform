import { Express } from 'express'
import { init } from '@server/api/init/init'
import { ApiEndPoint } from '@common/api/endpoint'

export const InitApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Init.one(), init)
  },
}

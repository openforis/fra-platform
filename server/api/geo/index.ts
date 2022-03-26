import { Express } from 'express'

import { ApiEndPoint } from '@common/api/endpoint'
import { sepalProxy } from './sepalProxy'

export const GeoApi = {
  init: (express: Express): void => {
    express.use(ApiEndPoint.Geo.sepalProxy(), sepalProxy)
  },
}

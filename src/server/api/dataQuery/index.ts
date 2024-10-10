import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getDashboardItems } from './getDashboardItems'

export const DataQueryApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.DataQuery.one(), getDashboardItems)
  },
}

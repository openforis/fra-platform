import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { AuthMiddleware } from '@server/middleware/auth'

import { persistNodeValues } from './table/persistNodeValues'

export const CycleDataApi = {
  init: (express: Express): void => {
    // table
    express.patch(ApiEndPoint.CycleData.Table.nodes(), AuthMiddleware.requireEdit, persistNodeValues)
  },
}

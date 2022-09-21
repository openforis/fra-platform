import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { AuthMiddleware } from '@server/middleware/auth'

import { postCountry } from './postCountry'

export const AreaApi = {
  init: (express: Express): void => {
    // Country
    express.post(ApiEndPoint.Area.country(), AuthMiddleware.requireEditTableData, postCountry)
  },
}

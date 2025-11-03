import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getData } from 'server/api/explorer/getData'
import { getMetadata } from 'server/api/explorer/getMetadata'
import { AuthMiddleware } from 'server/middleware/auth'

export const ExplorerApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Explorer.data(), getData)
    express.get(ApiEndPoint.Explorer.sectionsMetadata(), AuthMiddleware.requireView, getMetadata)
  },
}

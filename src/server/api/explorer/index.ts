import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { AuthMiddleware } from 'server/middleware/auth'

import { getMetadata } from './getMetadata'

export const ExplorerApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Explorer.sectionsMetadata(), AuthMiddleware.requireView, getMetadata)
  },
}

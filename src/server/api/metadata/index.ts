import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { AuthMiddleware } from 'server/middleware/auth'

import { getSections } from './getSections'
import { getSectionsMetadata } from './getSectionsMetadata'

export const MetadataApi = {
  init: (express: Express) => {
    express.get(ApiEndPoint.MetaData.sections(), AuthMiddleware.requireView, getSections)
    express.get(ApiEndPoint.MetaData.sectionsMetadata(), AuthMiddleware.requireView, getSectionsMetadata)
  },
}

import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getMetaCache } from './getMetaCache'
import { getSections } from './getSections'
import { getSectionsMetadata } from './getSectionsMetadata'

export const MetadataApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.MetaData.metaCache(), getMetaCache)
    express.get(ApiEndPoint.MetaData.sections(), getSections)
    express.get(ApiEndPoint.MetaData.sectionsMetadata(), getSectionsMetadata)
  },
}

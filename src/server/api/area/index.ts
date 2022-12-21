import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { AuthMiddleware } from '@server/middleware/auth'

import { getAreas } from './getAreas'
import { postCountry } from './postCountry'

export const AreaApi = {
  init: (express: Express): void => {
    // Country
    express.post(ApiEndPoint.Area.country(), AuthMiddleware.requireEditAssessmentStatus, postCountry)
    express.get(ApiEndPoint.Area.areas(), getAreas)
  },
}

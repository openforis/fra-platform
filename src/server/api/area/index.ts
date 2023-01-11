import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { AuthMiddleware } from '@server/middleware/auth'

import { getAreas } from './getAreas'
import { postCountry } from './postCountry'
import { postCountryProperty } from './postCountryProperty'

export const AreaApi = {
  init: (express: Express): void => {
    // Country
    express.post(ApiEndPoint.Area.country(), AuthMiddleware.requireEditCountryProps, postCountry)
    express.post(ApiEndPoint.Area.countryProperty(), AuthMiddleware.requireEditTableData, postCountryProperty)
    express.get(ApiEndPoint.Area.areas(), getAreas)
  },
}

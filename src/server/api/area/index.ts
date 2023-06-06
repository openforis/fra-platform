import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { AuthMiddleware } from 'server/middleware/auth'

import { getAreas } from './getAreas'
import { postCountry } from './postCountry'
import { updateCountryProp } from './updateCountryProp'

export const AreaApi = {
  init: (express: Express): void => {
    // Country
    express.post(ApiEndPoint.Area.country(), AuthMiddleware.requireEditCountryProps, postCountry)
    express.patch(ApiEndPoint.Area.countryProp(), AuthMiddleware.requireEditTableData, updateCountryProp)
    express.get(ApiEndPoint.Area.areas(), getAreas)
  },
}

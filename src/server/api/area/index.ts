import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { AuthMiddleware } from '@server/middleware/auth'

import { getFile } from './getFile'
import { getFiles } from './getFiles'
import { postCountry } from './postCountry'

export const AreaApi = {
  init: (express: Express): void => {
    // Country
    express.post(ApiEndPoint.Area.country(), AuthMiddleware.requireEdit, postCountry)

    // Files
    express.get(ApiEndPoint.Area.files(), getFiles)
    express.get(ApiEndPoint.Area.file(), getFile)
  },
}

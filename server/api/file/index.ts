import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { getFile } from './get'

export const FileApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.File.Dashboard.one(), getFile)
  },
}

import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { getFile } from './get'
import { getDataDownloadFile } from './getDataDownloadFile'

export const FileApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.File.Dashboard.one(), getFile)
    express.get(ApiEndPoint.File.DataDownload.one(), getDataDownloadFile)
  },
}

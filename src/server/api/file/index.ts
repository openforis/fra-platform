import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { getBulkDownload } from '@server/api/file/getBulkDownload'

import { getFile } from './get'
import { getDataDownloadFile } from './getDataDownloadFile'

export const FileApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.File.dashboard(), getFile)
    express.get(ApiEndPoint.File.dataDownload(), getDataDownloadFile)
    express.get(ApiEndPoint.File.bulkDownload(), getBulkDownload)
  },
}

import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { createManyFiles } from 'server/api/file/createManyFiles'
import { AuthMiddleware } from 'server/middleware/auth'

import { getFile } from './get'
import { getBiomassStockFile } from './getBiomassStockFile'
import { getBulkDownload } from './getBulkDownload'
import { getDataDownloadFile } from './getDataDownloadFile'
import { getHiddenFile } from './getHiddenFile'
import { getUserGuideFile } from './getUserGuide'
import multer = require('multer')

const fileFilter = (_req: any, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
  // eslint-disable-next-line no-param-reassign
  file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
  callback(null, true)
}

export const FileApi = {
  init: (express: Express): void => {
    // Dashboard
    express.get(ApiEndPoint.File.dashboard(), AuthMiddleware.requireView, getFile)
    express.get(ApiEndPoint.File.dataDownload(), AuthMiddleware.requireView, getDataDownloadFile)
    express.get(ApiEndPoint.File.bulkDownload(), AuthMiddleware.requireView, getBulkDownload)
    express.get(ApiEndPoint.File.userGuide(), getUserGuideFile)
    express.get(ApiEndPoint.File.hidden(), AuthMiddleware.requireUser, getHiddenFile)

    // BiomassStock
    express.get(ApiEndPoint.File.biomassStock({}), AuthMiddleware.requireEditTableData, getBiomassStockFile)

    // Files
    express.post(
      ApiEndPoint.File.many(),
      multer({ fileFilter }).array('file'),
      AuthMiddleware.requireEditRepositoryItem,
      createManyFiles
    )
  },
}

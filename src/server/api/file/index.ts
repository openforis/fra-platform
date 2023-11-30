import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { AuthMiddleware } from 'server/middleware/auth'

import { createAssessmentFile } from './createAssessmentFile'
import { getFile } from './get'
import { getAssessmentFile } from './getAssessmentFile'
import { getAssessmentFiles } from './getAssessmentFiles'
import { getBiomassStockFile } from './getBiomassStockFile'
import { getBulkDownload } from './getBulkDownload'
import { getDataDownloadFile } from './getDataDownloadFile'
import { getHiddenFile } from './getHiddenFile'
import { getSdgFocalPointsFile } from './getSdgFocalPointsFile'
import { getUserGuideFile } from './getUserGuide'
import { removeAssessmentFile } from './removeAssessmentFile'
import { updateAssessmentFileAccess } from './updateAssessmentFileAccess'
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
    express.get(ApiEndPoint.File.sdgFocalPoints(), AuthMiddleware.requireView, getSdgFocalPointsFile)
    express.get(ApiEndPoint.File.hidden(), AuthMiddleware.requireUser, getHiddenFile)

    // BiomassStock
    express.get(ApiEndPoint.File.biomassStock({}), AuthMiddleware.requireEditTableData, getBiomassStockFile)

    // Files
    // File list
    express.get(ApiEndPoint.File.Assessment.many(), AuthMiddleware.requireView, getAssessmentFiles)

    // File operations
    express.put(
      ApiEndPoint.File.Assessment.many(),
      multer({ fileFilter }).single('file'),
      AuthMiddleware.requireEditAssessmentFile,
      createAssessmentFile
    )
    express.get(ApiEndPoint.File.Assessment.one(), /* Auth handled in controller */ getAssessmentFile)
    express.delete(ApiEndPoint.File.Assessment.one(), AuthMiddleware.requireEditCountryFile, removeAssessmentFile)
    express.put(
      ApiEndPoint.File.Assessment.access(),
      AuthMiddleware.requireEditAssessmentFileAccess,
      updateAssessmentFileAccess
    )
  },
}

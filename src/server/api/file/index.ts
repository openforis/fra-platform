import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getBulkDownload } from 'server/api/file/getBulkDownload'
import { getUserGuideFile } from 'server/api/file/getUserGuide'
import { AuthMiddleware } from 'server/middleware/auth'

import { createAssessmentFile } from './createAssessmentFile'
import { getFile } from './get'
import { getAssessmentFile } from './getAssessmentFile'
import { getAssessmentFiles } from './getAssessmentFiles'
import { getBiomassStockFile } from './getBiomassStockFile'
import { getDataDownloadFile } from './getDataDownloadFile'
import { removeAssessmentFile } from './removeAssessmentFile'
import { getSdgFocalPointsFile } from './getSdgFocalPointsFile'
import multer = require('multer')

export const FileApi = {
  init: (express: Express): void => {
    // Dashboard
    express.get(ApiEndPoint.File.dashboard(), AuthMiddleware.requireView, getFile)
    express.get(ApiEndPoint.File.dataDownload(), AuthMiddleware.requireView, getDataDownloadFile)
    express.get(ApiEndPoint.File.bulkDownload(), AuthMiddleware.requireView, getBulkDownload)
    express.get(ApiEndPoint.File.userGuide(), getUserGuideFile)
    express.get(ApiEndPoint.File.sdgFocalPoints(), AuthMiddleware.requireView, getSdgFocalPointsFile)

    // BiomassStock
    express.get(ApiEndPoint.File.biomassStock({}), AuthMiddleware.requireEditTableData, getBiomassStockFile)

    // Files
    express.put(
      ApiEndPoint.File.Assessment.many(),
      multer().single('file'),
      AuthMiddleware.requireEditAssessmentFile,
      createAssessmentFile
    )
    express.get(ApiEndPoint.File.Assessment.many(), AuthMiddleware.requireView, getAssessmentFiles)
    express.get(ApiEndPoint.File.Assessment.one(), AuthMiddleware.requireView, getAssessmentFile)
    express.delete(ApiEndPoint.File.Assessment.one(), AuthMiddleware.requireEditAssessmentFile, removeAssessmentFile)
  },
}

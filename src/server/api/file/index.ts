import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { AuthMiddleware } from '@server/middleware/auth'

import { createAssessmentFile } from './createAssessmentFile'
import { getFile } from './get'
import { getAssessmentFile } from './getAssessmentFile'
import { getAssessmentFiles } from './getAssessmentFiles'
import { getDataDownloadFile } from './getDataDownloadFile'
import { removeAssessmentFile } from './removeAssessmentFile'
import multer = require('multer')

export const FileApi = {
  init: (express: Express): void => {
    // Dashboard
    express.get(ApiEndPoint.File.dashboard(), getFile)
    express.get(ApiEndPoint.File.dataDownload(), getDataDownloadFile)

    // Files
    express.put(
      ApiEndPoint.File.Assessment.many(),
      multer().single('file'),
      AuthMiddleware.requireEdit,
      createAssessmentFile
    )
    express.get(ApiEndPoint.File.Assessment.many(), AuthMiddleware.requireView, getAssessmentFiles)
    express.get(ApiEndPoint.File.Assessment.one(), AuthMiddleware.requireView, getAssessmentFile)
    express.delete(ApiEndPoint.File.Assessment.one(), AuthMiddleware.requireEdit, removeAssessmentFile)
  },
}

import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

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
    express.put(ApiEndPoint.File.Assessment.many(), multer().single('file'), createAssessmentFile)
    express.get(ApiEndPoint.File.Assessment.many(), getAssessmentFiles)
    express.get(ApiEndPoint.File.Assessment.one(), getAssessmentFile)
    express.delete(ApiEndPoint.File.Assessment.one(), removeAssessmentFile)
  },
}

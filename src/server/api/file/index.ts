import { Express } from 'express'
import multer from 'multer'

import { ApiEndPoint } from 'meta/api/endpoint'

import { createManyFiles } from 'server/api/file/createManyFiles'
import { AuthMiddleware } from 'server/middleware/auth'

import { getBulkDownload } from './getBulkDownload'
import { getHiddenFile } from './getHiddenFile'
import { getMultipleS3Files } from './getMultipleS3Files'
import { getStaticS3File } from './getStaticS3File'

const fileFilter = (_req: any, file: Express.Multer.File, callback: multer.FileFilterCallback): void => {
  // eslint-disable-next-line no-param-reassign
  file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
  callback(null, true)
}

export const FileApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.File.bulkDownload(), AuthMiddleware.requireView, getBulkDownload)
    express.get(ApiEndPoint._Legacy.File.hidden(), AuthMiddleware.requireUser, getHiddenFile)

    // Files
    express.post(
      ApiEndPoint.File.many(),
      multer({ fileFilter }).array('file'),
      AuthMiddleware.requireEditRepositoryItem,
      createManyFiles
    )

    // Static S3 files
    express.get(ApiEndPoint.Static.file(), AuthMiddleware.requireView, getStaticS3File)
    express.get(ApiEndPoint.Static.files(), AuthMiddleware.requireView, getMultipleS3Files)
  },
}

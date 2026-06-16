import { Express } from 'express'
import multer from 'multer'

import { ApiEndPoint } from 'meta/api/endpoint'

import { exportLinks } from 'server/api/cycleData/links/exportLinks'
import { getLinksCount } from 'server/api/cycleData/links/getLinksCount'
import { getManyLinks } from 'server/api/cycleData/links/getManyLinks'
import { updateLink } from 'server/api/cycleData/links/updateLink'
import { verifyLinks } from 'server/api/cycleData/links/verifyLinks'
import { verifyStatus } from 'server/api/cycleData/links/verifyStatus'
import { verifySummary } from 'server/api/cycleData/links/verifySummary'
import { AuthMiddleware } from 'server/middleware/auth'
import { FormDataBodyMiddleware } from 'server/middleware/formDataBodyMiddleware'

import { createRepositoryItem } from './repository/createRepositoryItem'
import { getManyRepository } from './repository/getManyRepository'
import { getManyRepositoryFiles } from './repository/getManyRepositoryFiles'
import { getRepositoryFile } from './repository/getRepositoryFile'
import { getRepositoryFileMeta } from './repository/getRepositoryFileMeta'
import { removeRepositoryItem } from './repository/removeRepositoryItem'
import { updateRepositoryItem } from './repository/updateRepositoryItem'

export const CycleDataApi = {
  init: (express: Express): void => {
    // Country Links
    express.get(ApiEndPoint.CycleData.Links.count(), AuthMiddleware.requireVerifyLinks, getLinksCount)
    express.get(ApiEndPoint.CycleData.Links.many(), AuthMiddleware.requireVerifyLinks, getManyLinks)
    express.get(ApiEndPoint.CycleData.Links.export(), AuthMiddleware.requireVerifyLinks, exportLinks)
    express.patch(ApiEndPoint.CycleData.Links.one(), AuthMiddleware.requireVerifyLinks, updateLink)
    express.post(ApiEndPoint.CycleData.Links.verify(), AuthMiddleware.requireVerifyLinks, verifyLinks)
    express.get(ApiEndPoint.CycleData.Links.verifySummary(), AuthMiddleware.requireVerifyLinks, verifySummary)
    express.get(ApiEndPoint.CycleData.Links.verifyStatus(), AuthMiddleware.requireVerifyLinks, verifyStatus)

    // repository
    express.post(
      ApiEndPoint.CycleData.Repository.one(),
      multer().none(),
      FormDataBodyMiddleware.parseBody,
      AuthMiddleware.requireEditRepositoryItem,
      createRepositoryItem
    )
    express.get(
      ApiEndPoint.CycleData.Repository.File.one(),
      AuthMiddleware.requireViewRepositoryItem,
      getRepositoryFile
    )
    express.get(ApiEndPoint.CycleData.Repository.File.many(), AuthMiddleware.requireView, getManyRepositoryFiles)
    express.get(
      ApiEndPoint.CycleData.Repository.fileMeta(),
      AuthMiddleware.requireEditRepositoryItem,
      getRepositoryFileMeta
    )
    express.get(ApiEndPoint.CycleData.Repository.many(), AuthMiddleware.requireView, getManyRepository)
    express.put(
      ApiEndPoint.CycleData.Repository.one(),
      multer().none(),
      FormDataBodyMiddleware.parseBody,
      AuthMiddleware.requireEditRepositoryItem,
      updateRepositoryItem
    )
    express.delete(
      ApiEndPoint.CycleData.Repository.one(),
      AuthMiddleware.requireEditRepositoryItem,
      removeRepositoryItem
    )
  },
}

import { Express } from 'express'
import multer from 'multer'

import { ApiEndPoint } from 'meta/api/endpoint'

import { createRepositoryItem } from 'server/api/cycleData/repository/createRepositoryItem'
import { getManyRepository } from 'server/api/cycleData/repository/getManyRepository'
import { getManyRepositoryFiles } from 'server/api/cycleData/repository/getManyRepositoryFiles'
import { getRepositoryFile } from 'server/api/cycleData/repository/getRepositoryFile'
import { getRepositoryFileMeta } from 'server/api/cycleData/repository/getRepositoryFileMeta'
import { removeRepositoryItem } from 'server/api/cycleData/repository/removeRepositoryItem'
import { updateRepositoryItem } from 'server/api/cycleData/repository/updateRepositoryItem'
import { AuthMiddleware } from 'server/middleware/auth'
import { FormDataBodyMiddleware } from 'server/middleware/formDataBodyMiddleware'

export const RepositoryApi = {
  init: (express: Express): void => {
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

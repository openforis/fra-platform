import { getOneFile } from 'server/controller/cycleData/repository/getOneFile'
import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'

import { create } from './create'
import { getFileMeta } from './getFileMeta'
import { getManyFiles } from './getManyFiles'
import { remove } from './remove'
import { update } from './update'

export const Repository = {
  create,
  getOneFile,
  getFileMeta,
  getMany: RepositoryRepository.getMany,
  getManyFiles,
  getOne: RepositoryRepository.getOne,
  remove,
  update,
}

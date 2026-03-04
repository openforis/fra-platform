import { getOneFile } from 'server/controller/cycleData/repository/getOneFile'
import { RepositoryRepository } from 'server/db/repository/assessmentCycle/repository'

import { create } from './create'
import { getFileMeta } from './getFileMeta'
import { getMany } from './getMany'
import { getManyFiles } from './getManyFiles'
import { remove } from './remove'
import { update } from './update'

export const Repository = {
  create,
  getOneFile,
  getFileMeta,
  getMany,
  getManyFiles,
  getOne: RepositoryRepository.getOne,
  remove,
  update,
}

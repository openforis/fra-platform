import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'

import { create } from './create'
import { getFile } from './getFile'
import { getFileMeta } from './getFileMeta'
import { getManyFiles } from './getManyFiles'
import { remove } from './remove'
import { update } from './update'

export const Repository = {
  create,
  getFile,
  getFileMeta,
  getMany: RepositoryRepository.getMany,
  getManyFiles,
  getOne: RepositoryRepository.getOne,
  remove,
  update,
}

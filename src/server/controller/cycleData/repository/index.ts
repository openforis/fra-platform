import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'

import { create } from './create'
import { getFile } from './getFile'
import { remove } from './remove'
import { update } from './update'

export const Repository = {
  create,
  getMany: RepositoryRepository.getMany,
  getOne: RepositoryRepository.getOne,
  getFile,
  update,
  remove,
}

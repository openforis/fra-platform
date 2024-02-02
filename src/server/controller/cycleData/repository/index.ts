import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'

import { create } from './create'
import { remove } from './remove'

export const Repository = {
  create,
  getMany: RepositoryRepository.getMany,
  remove,
}

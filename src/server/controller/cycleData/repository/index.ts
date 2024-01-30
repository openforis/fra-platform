import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'

import { create } from './create'

export const Repository = {
  create,
  getMany: RepositoryRepository.getMany,
}

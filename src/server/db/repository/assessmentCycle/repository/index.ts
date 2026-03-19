import { create } from 'server/db/repository/assessmentCycle/repository/create'
import { getMany } from 'server/db/repository/assessmentCycle/repository/getMany'
import { getManyAsTree } from 'server/db/repository/assessmentCycle/repository/getManyAsTree'
import { getOne } from 'server/db/repository/assessmentCycle/repository/getOne'
import { getUsages } from 'server/db/repository/assessmentCycle/repository/getUsages'
import { remove } from 'server/db/repository/assessmentCycle/repository/remove'
import { update } from 'server/db/repository/assessmentCycle/repository/update'

export const RepositoryRepository = {
  create,
  getMany,
  getManyAsTree,
  getOne,
  getUsages,
  remove,
  update,
}

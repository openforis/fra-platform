import { create } from 'server/db/repository/assessmentCycle/repository/create'
import { getMany } from 'server/db/repository/assessmentCycle/repository/getMany'
import { getOne } from 'server/db/repository/assessmentCycle/repository/getOne'
import { remove } from 'server/db/repository/assessmentCycle/repository/remove'
import { update } from 'server/db/repository/assessmentCycle/repository/update'

export const RepositoryRepository = {
  create,
  getMany,
  getOne,
  remove,
  update,
}

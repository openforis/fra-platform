import { AssessmentRedisRepository } from 'server/cache/repository/assessment'
import { MetaCacheRedisRepository } from 'server/cache/repository/metaCache'
import { CycleRepository } from 'server/db/repository/assessmentCycle/cycle'

import { cloneCycle } from './cloneCycle'
import { create } from './create'
import { createCycle } from './createCycle'
import { publishCycle } from './publishCycle'
import { remove } from './remove'
import { removeCycle } from './removeCycle'
import { renameCycle } from './renameCycle'

export const AssessmentController = {
  // assessment
  create,
  getAll: AssessmentRedisRepository.getAssessmentsList,
  getOne: AssessmentRedisRepository.getOne,
  getOneWithCycle: AssessmentRedisRepository.getOneWithCycle,
  remove,

  // cycle
  cloneCycle,
  createCycle,
  removeCycle,
  renameCycle,
  publishCycle,
  updateCycle: CycleRepository.update,

  // meta cache
  getMetaCache: MetaCacheRedisRepository.getMetaCache,
}

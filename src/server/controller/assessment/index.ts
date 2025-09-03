import { getOneWithCycle } from 'server/controller/assessment/getOneWithCycle'
import { AssessmentRepository } from 'server/repository/assessment/assessment'
import { CycleRepository } from 'server/repository/assessmentCycle/cycle'
import { AssessmentRedisRepository } from 'server/repository/redis/assessment'
import { MetaCacheRedisRepository } from 'server/repository/redis/metaCache'

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
  getOne: AssessmentRepository.getOne,
  getOneWithCycle,
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

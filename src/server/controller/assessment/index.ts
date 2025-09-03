import { AssessmentRepository } from 'server/repository/assessment/assessment'
import { CycleRepository } from 'server/repository/assessmentCycle/cycle'
import { AssessmentRedisRepository } from 'server/repository/redis/assessment'

import { cloneCycle } from './cloneCycle'
import { create } from './create'
import { createCycle } from './createCycle'
import { generateMetaCache } from './generateMetaCache'
import { getOneWithCycle } from './getOne'
import { publishCycle } from './publishCycle'
import { remove } from './remove'
import { removeCycle } from './removeCycle'
import { renameCycle } from './renameCycle'

export const AssessmentController = {
  // assessment
  create,
  getAll: AssessmentRepository.getAll,
  getOne: AssessmentRepository.getOne,
  /**
   * @deprecated
   */
  getOneWithCycleDeprecated: getOneWithCycle,
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
  getMetaCache: AssessmentRepository.getMetaCache,
  generateMetaCache,
}

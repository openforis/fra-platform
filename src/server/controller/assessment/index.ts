import { AssessmentRepository } from 'server/repository/assessment/assessment'
import { CycleRepository } from 'server/repository/assessmentCycle/cycle'

import { cloneCycle } from './cloneCycle'
import { create } from './create'
import { createCycle } from './createCycle'
import { generateDataCache } from './generateDataCache'
import { generateMetaCache } from './generateMetaCache'
import { generateMetadataCache } from './generateMetadataCache'
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
  getOneWithCycle,
  remove,

  // cycle
  cloneCycle,
  createCycle,
  removeCycle,
  renameCycle,
  publishCycle,
  updateCycle: CycleRepository.update,

  // data cache
  generateDataCache,
  // metadata cache
  generateMetadataCache,
  // meta cache
  getMetaCache: AssessmentRepository.getMetaCache,
  generateMetaCache,
}

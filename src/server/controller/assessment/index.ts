import { AssessmentRepository } from 'server/repository/assessment/assessment'

import { cloneCycle } from './cloneCycle'
import { create } from './create'
import { createCycle } from './createCycle'
import { generateDataCache } from './generateDataCache'
import { generateMetaCache } from './generateMetaCache'
import { generateMetadataCache } from './generateMetadataCache'
import { getOneWithCycle } from './getOne'
import { remove } from './remove'
import { removeCycle } from './removeCycle'
import { renameCycle } from './renameCycle'
import { updateDefaultCycle } from './update'

export const AssessmentController = {
  // assessment
  create,
  getAll: AssessmentRepository.getAll,
  getOne: AssessmentRepository.getOne,
  getOneWithCycle,
  remove,
  updateDefaultCycle,

  // cycle
  cloneCycle,
  createCycle,
  removeCycle,
  renameCycle,

  // data cache
  generateDataCache,
  // metadata cache
  generateMetadataCache,
  // meta cache
  getMetaCache: AssessmentRepository.getMetaCache,
  generateMetaCache,
}

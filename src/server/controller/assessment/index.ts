import { AssessmentRepository } from 'server/repository/assessment/assessment'

import { create } from './create'
import { createCycle } from './createCycle'
import { generateDataCache } from './generateDataCache'
import { generateMetaCache } from './generateMetaCache'
import { getOneWithCycle } from './getOne'
import { remove } from './remove'
import { updateDefaultCycle } from './update'

export const AssessmentController = {
  create,
  createCycle,
  getAll: AssessmentRepository.getAll,
  getOne: AssessmentRepository.getOne,
  getOneWithCycle,
  remove,
  updateDefaultCycle,

  // data cache
  generateDataCache,
  // meta cache
  getMetaCache: AssessmentRepository.getMetaCache,
  generateMetaCache,
}

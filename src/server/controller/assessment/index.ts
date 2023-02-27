import { create } from './create'
import { createCycle } from './createCycle'
import { generateMetaCache } from './generateMetaCache'
import { getOne, getOneWithCycle } from './getOne'
import { remove } from './remove'
import { updateDefaultCycle } from './update'

export const AssessmentController = {
  create,
  createCycle,
  getOne,
  getOneWithCycle,
  remove,
  updateDefaultCycle,
  generateMetaCache,
}

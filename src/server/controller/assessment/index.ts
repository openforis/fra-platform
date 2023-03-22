import { create } from './create'
import { createCycle } from './createCycle'
import { generateMetaCache } from './generateMetaCache'
import { getAll } from './getAll'
import { getOne, getOneWithCycle } from './getOne'
import { remove } from './remove'
import { updateDefaultCycle } from './update'

export const AssessmentController = {
  create,
  createCycle,
  getAll,
  getOne,
  getOneWithCycle,
  remove,
  updateDefaultCycle,

  generateMetaCache,
}

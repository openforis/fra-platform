import { TableRepository } from '@server/repository/assessment/table'

import { create } from './create'
import { createCycle } from './createCycle'
import { getOne, getOneWithCycle } from './getOne'
import { remove } from './remove'
import { update } from './update'

export const AssessmentController = {
  create,
  createCycle,
  getOne,
  getOneWithCycle,
  getTable: TableRepository.getOne,
  remove,
  update,
}

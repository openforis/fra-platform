import { TableRepository } from '@server/repository/assessment/table'

import { create } from './create'
import { createCycle } from './createCycle'
import { createFile } from './createFile'
import { getOne, getOneWithCycle } from './getOne'
import { remove } from './remove'

export const AssessmentController = {
  create,
  createCycle,
  createFile,
  getOne,
  getOneWithCycle,
  getTable: TableRepository.getOne,
  remove,
}

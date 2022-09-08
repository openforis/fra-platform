import { AssessmentFileRepository } from '@server/repository/assessment/file'
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
  getFile: AssessmentFileRepository.getOne,
  getFiles: AssessmentFileRepository.getMany,
  getOne,
  getOneWithCycle,
  getTable: TableRepository.getOne,
  remove,
  removeFile: AssessmentFileRepository.remove,
}

import { AssessmentRepository } from '@server/repository/assessment/assessment'
import { TableRepository } from '@server/repository/assessment/table'

import { create } from './create'
import { createCycle } from './createCycle'
import { getOne, getOneWithCycle } from './getOne'
import { getSection } from './getSection'
import { getSections } from './getSections'
import { remove } from './remove'

export const AssessmentController = {
  create,
  getOne,
  getOneWithCycle,
  remove,
  getSections,
  getSectionMetadata: AssessmentRepository.getSectionMetaData,
  createCycle,
  getSection,
  getTable: TableRepository.getOne,
}

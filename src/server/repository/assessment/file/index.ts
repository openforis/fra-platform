import { create } from './create'
import { getFileUsages } from './getFileUsages'
import { getMany } from './getMany'
import { getOne } from './getOne'
import { remove } from './remove'

export const AssessmentFileRepository = {
  create,
  getMany,
  getOne,
  remove,
  getFileUsages,
}

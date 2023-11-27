import { create } from './create'
import { getFileUsages } from './getFileUsages'
import { getMany } from './getMany'
import { getOne } from './getOne'
import { remove } from './remove'
import { updateMany } from './updateMany'

export const AssessmentFileRepository = {
  create,
  getMany,
  getOne,
  updateMany,
  remove,
  getFileUsages,
}

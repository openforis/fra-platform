import { create } from './create'
import { fileIsInUse } from './fileIsInUse'
import { getMany } from './getMany'
import { getOne } from './getOne'
import { remove } from './remove'

export const AssessmentFileRepository = {
  create,
  getMany,
  getOne,
  remove,
  fileIsInUse,
}

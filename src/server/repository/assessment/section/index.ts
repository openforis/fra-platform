import { create, createSubSection } from './create'
import { getMany } from './getMany'
import { getManyMetadata } from './getManyMetadata'
import { getOne } from './getOne'
import { remove } from './remove'
import { update, updateSubSection } from './update'

export const SectionRepository = {
  getMany,
  getManyMetadata,
  getOne,
  create,
  createSubSection,
  remove,
  update,
  updateSubSection,
}

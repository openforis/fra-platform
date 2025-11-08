import { cloneMany } from 'server/db/repository/assessment/section/cloneMany'
import { create, createSubSection } from 'server/db/repository/assessment/section/create'
import { getMany } from 'server/db/repository/assessment/section/getMany'
import { getManyMetadata } from 'server/db/repository/assessment/section/getManyMetadata'
import { getOne } from 'server/db/repository/assessment/section/getOne'
import { remove } from 'server/db/repository/assessment/section/remove'
import { update, updateSubSection } from 'server/db/repository/assessment/section/update'

export const SectionRepository = {
  cloneMany,
  create,
  createSubSection,
  getMany,
  getManyMetadata,
  getOne,
  remove,
  update,
  updateSubSection,
}

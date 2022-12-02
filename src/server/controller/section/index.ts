import { createSection } from '@server/controller/section/create'
import { removeSection } from '@server/controller/section/remove'
import { updateSection } from '@server/controller/section/update'

export const SectionController = {
  removeSection,
  createSection,
  updateSection,
}

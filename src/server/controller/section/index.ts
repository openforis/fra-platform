import { createSection } from '@server/controller/section/createSection'
import { removeSection } from '@server/controller/section/removeSection'
import { updateSection } from '@server/controller/section/updateSection'

export const SectionController = {
  removeSection,
  createSection,
  updateSection,
}

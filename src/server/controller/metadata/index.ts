import { SectionRepository } from '@server/repository/assessment/section'

import { createSection } from './createSection'
import { createSubSection } from './createSubSection'
import { removeSection } from './removeSection'
import { updateSection } from './updateSection'
import { updateSubSection } from './updateSubSection'

export const MetadataController = {
  getSection: SectionRepository.getOne,
  getSections: SectionRepository.getMany,
  getSectionsMetadata: SectionRepository.getManyMetadata,
  removeSection,
  createSection,
  createSubSection,
  updateSection,
  updateSubSection,
}

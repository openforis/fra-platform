import { SectionRepository } from '@server/repository/assessment/section'

import { createSection } from './createSection'
import { removeSection } from './removeSection'
import { updateSection } from './updateSection'

export const MetadataController = {
  getSection: SectionRepository.getOne,
  getSections: SectionRepository.getMany,
  getSectionsMetadata: SectionRepository.getManyMetadata,
  removeSection,
  createSection,
  updateSection,
}

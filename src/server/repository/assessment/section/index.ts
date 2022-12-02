import { createAssessmentSection } from './createSection'
import { getMany } from './getMany'
import { getManyMetadata } from './getManyMetadata'
import { getOne } from './getOne'
import { removeAssessmentSection } from './removeSection'
import { updateAssessmentSection } from './updateSection'

export const SectionRepository = {
  getMany,
  getManyMetadata,
  getOne,
  createAssessmentSection,
  removeAssessmentSection,
  updateAssessmentSection,
}

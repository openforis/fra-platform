import { removeAssessmentSection } from '@server/controller/section/remove'
import { createAssessmentSection } from '@server/repository/assessment/section/createSection'

export const SectionController = {
  createAssessmentSection,
  removeAssessmentSection,
}

import { createAssessmentSchema } from './createAssessmentSchema'
import { createAssessment } from './createAssessment'
import { read } from './read'
import { removeAssessmentSchema } from './removeAssessmentSchema'
import { removeAssessment } from './removeAssessment'

export const AssessmentRepository = {
  createAssessment,
  createAssessmentSchema,
  read,
  removeAssessmentSchema,
  removeAssessment,
}

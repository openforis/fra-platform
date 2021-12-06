import { createAssessmentSchema } from './createAssessmentSchema'
import { createAssessment } from './createAssessment'
import { read } from './read'
import { removeAssessmentSchema } from './removeAssessmentSchema'
import { removeAssessment } from './removeAssessment'
import { getCountryISOs } from './getCountryISOs'
import { getRegionGroups } from './getRegionGroups'
import { createAssessmentCycle } from './createAssessmentCycle'

export const AssessmentRepository = {
  createAssessment,
  createAssessmentSchema,
  read,
  removeAssessmentSchema,
  removeAssessment,
  getCountryISOs,
  getRegionGroups,
  createAssessmentCycle,
}

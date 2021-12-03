import { createAssessment } from './createAssessment'
import { read } from './read'
import { removeAssessment } from './removeAssessment'
import { createAssessmentCycle } from './createAssessmentCycle'
import { getAssessmentCycles } from './getAssessmentCycles'
import { createAssessmentSchema } from './createAssessmentSchema'
import { removeAssessmentSchema } from './removeAssessmentSchema'
import { getCountries } from './getCountries'
import { getRegions } from './getRegions'
import { getRegionGroups } from './getRegionGroups'

export const AssessmentRepository = {
  createAssessment,
  read,
  removeAssessment,
  createAssessmentCycle,
  getAssessmentCycles,
  createAssessmentSchema,
  removeAssessmentSchema,
  getCountries,
  getRegions,
  getRegionGroups,
}

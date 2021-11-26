import { createAssessmentSchema } from './createAssessmentSchema'
import { createAssessment } from './createAssessment'
import { read } from './read'
import { removeAssessmentSchema } from './removeAssessmentSchema'
import { removeAssessment } from './removeAssessment'
import { getCountries } from './getCountries'
import { getRegions } from './getRegions'
import { getRegionGroups } from './getRegionGroups'

export const AssessmentRepository = {
  createAssessment,
  createAssessmentSchema,
  read,
  removeAssessmentSchema,
  removeAssessment,
  getCountries,
  getRegions,
  getRegionGroups,
}

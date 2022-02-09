import { createAssessmentSchema } from './createAssessmentSchema'
import { createAssessment } from './createAssessment'
import { read } from './read'
import { readSections } from './readSections'
import { removeAssessmentSchema } from './removeAssessmentSchema'
import { removeAssessment } from './removeAssessment'
import { getCountryISOs } from './getCountryISOs'
import { getRegionGroups } from './getRegionGroups'
import { getCountryStatus } from './getCountryStatus'
import { updateCountryStatus } from './updateCountryStatus'
import { getCreateSchemaDDL, getCreateSchemaCycleDDL } from './getCreateSchemaDDL'

export const AssessmentRepository = {
  createAssessment,
  createAssessmentSchema,
  read,
  readSections,
  removeAssessmentSchema,
  removeAssessment,
  getCountryISOs,
  getRegionGroups,
  getCountryStatus,
  updateCountryStatus,
  getCreateSchemaDDL,
  getCreateSchemaCycleDDL,
}

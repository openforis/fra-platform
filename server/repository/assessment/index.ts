import { createAssessmentSchema } from './createAssessmentSchema'
import { createAssessment } from './createAssessment'
import { read } from './read'
import { readSections } from './readSections'
import { getSectionMetaData } from './getSectionMetaData'
import { removeAssessmentSchema } from './removeAssessmentSchema'
import { removeAssessment } from './removeAssessment'
import { getCountryISOs } from './getCountryISOs'
import { getRegionGroups } from './getRegionGroups'
import { getCountry } from './getCountry'
import { updateCountry } from './updateCountry'
import {
  getCreateSchemaDDL,
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
} from './getCreateSchemaDDL'
import { getSection } from './getSection'

export const AssessmentRepository = {
  createAssessment,
  createAssessmentSchema,
  read,
  readSections,
  getSectionMetaData,
  removeAssessmentSchema,
  removeAssessment,
  getCountryISOs,
  getRegionGroups,
  getCreateSchemaDDL,
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
  getSection,
  getCountry,
  updateCountry,
}

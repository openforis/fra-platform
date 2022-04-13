import { createAssessment } from './createAssessment'
import { createAssessmentSchema } from './createAssessmentSchema'
import { getCountry } from './getCountry'
import {
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
  getCreateSchemaDDL,
} from './getCreateSchemaDDL'
import { getRegionGroups } from './getRegionGroups'
import { getSection } from './getSection'
import { getSectionMetaData } from './getSectionMetaData'
import { read } from './read'
import { readSections } from './readSections'
import { removeAssessment } from './removeAssessment'
import { removeAssessmentSchema } from './removeAssessmentSchema'
import { updateCountry } from './updateCountry'

export const AssessmentRepository = {
  createAssessment,
  createAssessmentSchema,
  read,
  readSections,
  getSectionMetaData,
  removeAssessmentSchema,
  removeAssessment,
  getRegionGroups,
  getCreateSchemaDDL,
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
  getSection,
  getCountry,
  updateCountry,
}

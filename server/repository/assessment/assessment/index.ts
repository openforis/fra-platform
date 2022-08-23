import { createAssessment } from './createAssessment'
import { createAssessmentSchema } from './createAssessmentSchema'
import {
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
  getCreateSchemaDDL,
} from './getCreateSchemaDDL'
import { getSection } from './getSection'
import { getSectionMetaData } from './getSectionMetaData'
import { read } from './read'
import { readSections } from './readSections'
import { removeAssessment } from './removeAssessment'
import { removeAssessmentSchema } from './removeAssessmentSchema'

export const AssessmentRepository = {
  createAssessment,
  createAssessmentSchema,
  read,
  readSections,
  getSectionMetaData,
  removeAssessmentSchema,
  removeAssessment,
  getCreateSchemaDDL,
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
  getSection,
}

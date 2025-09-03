import { createAssessment } from './createAssessment'
import { createAssessmentSchema } from './createAssessmentSchema'
import {
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
  getCreateSchemaDDL,
} from './getCreateSchemaDDL'
import { getOne } from './getOne'
import { removeAssessment } from './removeAssessment'
import { removeAssessmentSchema } from './removeAssessmentSchema'

export const AssessmentRepository = {
  createAssessment,
  createAssessmentSchema,
  getOne,
  removeAssessmentSchema,
  removeAssessment,
  getCreateSchemaDDL,
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
}

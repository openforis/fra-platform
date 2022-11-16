import { createAssessment } from './createAssessment'
import { createAssessmentSchema } from './createAssessmentSchema'
import {
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
  getCreateSchemaDDL,
} from './getCreateSchemaDDL'
import { read } from './read'
import { removeAssessment } from './removeAssessment'
import { removeAssessmentSchema } from './removeAssessmentSchema'
import { updateAssessment } from './updateAssessment'

export const AssessmentRepository = {
  createAssessment,
  createAssessmentSchema,
  read,
  removeAssessmentSchema,
  removeAssessment,
  getCreateSchemaDDL,
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
  updateAssessment,
}

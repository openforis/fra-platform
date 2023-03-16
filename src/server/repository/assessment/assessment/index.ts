import { createAssessment } from './createAssessment'
import { createAssessmentSchema } from './createAssessmentSchema'
import { get } from './get'
import { getAll } from './getAll'
import {
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
  getCreateSchemaDDL,
} from './getCreateSchemaDDL'
import { removeAssessment } from './removeAssessment'
import { removeAssessmentSchema } from './removeAssessmentSchema'
import { updateDefaultCycle } from './updateAssessment'

export const AssessmentRepository = {
  createAssessment,
  createAssessmentSchema,
  get,
  getAll,
  removeAssessmentSchema,
  removeAssessment,
  getCreateSchemaDDL,
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
  updateDefaultCycle,
}

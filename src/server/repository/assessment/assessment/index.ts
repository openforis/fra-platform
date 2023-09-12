import { createAssessment } from './createAssessment'
import { createAssessmentSchema } from './createAssessmentSchema'
import { getAll } from './getAll'
import {
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
  getCreateSchemaDDL,
} from './getCreateSchemaDDL'
import { getMetaCache } from './getMetaCache'
import { getOne } from './getOne'
import { removeAssessment } from './removeAssessment'
import { removeAssessmentSchema } from './removeAssessmentSchema'
import { updateDefaultCycle } from './updateAssessment'

export const AssessmentRepository = {
  createAssessment,
  createAssessmentSchema,
  getMetaCache,
  getOne,
  getAll,
  removeAssessmentSchema,
  removeAssessment,
  getCreateSchemaDDL,
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
  updateDefaultCycle,
}

import { createAssessment } from 'server/db/repository/assessment/assessment/createAssessment'
import { createAssessmentSchema } from 'server/db/repository/assessment/assessment/createAssessmentSchema'
import {
  getCreateSchemaCycleDDL,
  getCreateSchemaCycleOriginalDataPointViewDDL,
  getCreateSchemaDDL,
} from 'server/db/repository/assessment/assessment/getCreateSchemaDDL'
import { getOne } from 'server/db/repository/assessment/assessment/getOne'
import { removeAssessment } from 'server/db/repository/assessment/assessment/removeAssessment'
import { removeAssessmentSchema } from 'server/db/repository/assessment/assessment/removeAssessmentSchema'

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

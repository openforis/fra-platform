import { AssessmentNames } from 'meta/assessment/assessment'
import { TableNames } from 'meta/assessment/table'
import { Promises } from 'utils/promises'

import { CacheController } from 'server/cache/controller'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { Logger } from 'server/utils/logger'

const assessmentName = AssessmentNames.fra
const tableName = TableNames.sustainableDevelopment15_1_1
const variableName = 'forestAreaProportionLandArea2015'

const validateFn =
  "validatorNotGreaterThan(sustainableDevelopment15_1_1.forestAreaProportionLandArea2015, '100', 'generalValidation.forestAreaExceedsTotalLandArea')"

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  await Promises.each(assessment.cycles, async (cycle) => {
    const rowCount = await client.result(
      `
      update ${schemaName}.row r
      set props = jsonb_set(r.props, array['validateFns', $(cycleUuid)], to_jsonb(array[$(validateFn)]))
      from ${schemaName}.table t
      where r.table_uuid = t.uuid
        and t.props ->> 'name' = $(tableName)
        and r.props ->> 'variableName' = $(variableName)
        and r.props -> 'validateFns' ? $(cycleUuid)
      `,
      { cycleUuid: cycle.uuid, tableName, validateFn, variableName },
      (result) => result.rowCount
    )
    Logger.info(`step-update-validations-sustainableDevelopment15_1_1: cycle ${cycle.name}: ${rowCount} rows updated`)
  })

  await CacheController.generateMetaCache({}, client)
  await CacheController.generateMetadata({ assessment }, client)
}

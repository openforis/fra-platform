import { AssessmentNames } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleNames } from 'meta/assessment/cycle/names'

import { CacheController } from 'server/cache/controller'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { Logger } from 'server/utils/logger'

const assessmentName = AssessmentNames.panEuropean
const cycleName = CycleNames._2025
const tableName = 'table_3_3'
const variableName = 'total'

// The total formula leaves out all other plant products and all other animal products
const validateFn =
  "validatorEqualToSum(table_3_3.total['name_of_groups_of_product'], [table_3_3._10th['market_value_1000_national_currency'], table_3_3._09th['market_value_1000_national_currency'], table_3_3._08th['market_value_1000_national_currency'], table_3_3._07th['market_value_1000_national_currency'], table_3_3._06th['market_value_1000_national_currency'], table_3_3._05th['market_value_1000_national_currency'], table_3_3._04th['market_value_1000_national_currency'], table_3_3._03rd['market_value_1000_national_currency'], table_3_3._02nd['market_value_1000_national_currency'], table_3_3._01st['market_value_1000_national_currency'], table_3_3.all_other_plant_products['name_of_groups_of_product'], table_3_3.all_other_animal_products['name_of_groups_of_product']])"

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycle = Assessments.getCycle({ assessment, cycleName })
  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  const rowCount = await client.result(
    `
    update ${schemaName}.row r
    set props = jsonb_set(
      r.props,
      array['validateFns', $(cycleUuid)],
      to_jsonb(array[$(validateFn)])
    )
    from ${schemaName}.table t
    where r.table_uuid = t.uuid
      and t.props ->> 'name' = $(tableName)
      and r.props ->> 'variableName' = $(variableName)
      and r.props -> 'validateFns' ? $(cycleUuid)
    `,
    { cycleUuid: cycle.uuid, tableName, validateFn, variableName },
    (result) => result.rowCount
  )
  Logger.info(`step-update-validations-panEuropean-table-3-3-total: cycle ${cycle.name}: ${rowCount} rows updated`)

  await CacheController.generateMetaCache({}, client)
  await CacheController.generateMetadata({ assessment }, client)
}

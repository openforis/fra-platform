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
const tableName = 'table_3_4'
const colName = 'name_of_service_product'
const variableName = 'total'

// The total formula leaves out the remaining services
const validateFn =
  "validatorEqualToSum(table_3_4.total['name_of_service_product'], [table_3_4._10th['service_provision_value_1000_national_currency'], table_3_4._09th['service_provision_value_1000_national_currency'], table_3_4._08th['service_provision_value_1000_national_currency'], table_3_4._07th['service_provision_value_1000_national_currency'], table_3_4._06th['service_provision_value_1000_national_currency'], table_3_4._05th['service_provision_value_1000_national_currency'], table_3_4._04th['service_provision_value_1000_national_currency'], table_3_4._03rd['service_provision_value_1000_national_currency'], table_3_4._02nd['service_provision_value_1000_national_currency'], table_3_4._01st['service_provision_value_1000_national_currency'], table_3_4.remaining_total['name_of_service_product']])"

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycle = Assessments.getCycle({ assessment, cycleName })
  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  const rowCount = await client.result(
    `
    update ${schemaName}.col c
    set props = jsonb_set(
      c.props,
      array['validateFns', $(cycleUuid)],
      to_jsonb(array[$(validateFn)])
    )
    from ${schemaName}.row r, ${schemaName}.table t
    where c.row_uuid = r.uuid
      and r.table_uuid = t.uuid
      and t.props ->> 'name' = $(tableName)
      and r.props ->> 'variableName' = $(variableName)
      and c.props ->> 'colName' = $(colName)
      and c.props -> 'validateFns' ? $(cycleUuid)
    `,
    { colName, cycleUuid: cycle.uuid, tableName, validateFn, variableName },
    (result) => result.rowCount
  )
  Logger.info(`step-update-validations-panEuropean-table-3-4-total: cycle ${cycle.name}: ${rowCount} columns updated`)

  await CacheController.generateMetaCache({}, client)
  await CacheController.generateMetadata({ assessment }, client)
}

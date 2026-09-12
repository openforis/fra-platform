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
const tableName = 'table_1_4a'
const colName = 'soil_carbon'

const wrongColumn = "['soil']"
const rightColumn = "['soil_carbon']"

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
      (
        select jsonb_agg(replace(validateFn, $(wrongColumn), $(rightColumn)))
        from jsonb_array_elements_text(c.props -> 'validateFns' -> $(cycleUuid)) as validateFn
      )
    )
    from ${schemaName}.row r, ${schemaName}.table t
    where c.row_uuid = r.uuid
      and r.table_uuid = t.uuid
      and t.props ->> 'name' = $(tableName)
      and c.props ->> 'colName' = $(colName)
      and c.props -> 'validateFns' ? $(cycleUuid)
      and (c.props -> 'validateFns' -> $(cycleUuid))::text like $(pattern)
    `,
    { colName, cycleUuid: cycle.uuid, pattern: `%${wrongColumn}%`, rightColumn, tableName, wrongColumn },
    (result) => result.rowCount
  )
  Logger.info(
    `step-update-validations-panEuropean-table-1-4a-soil-carbon: cycle ${cycle.name}: ${rowCount} columns updated`
  )

  await CacheController.generateMetaCache({}, client)
  await CacheController.generateMetadata({ assessment }, client)
}

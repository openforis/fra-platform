import { AssessmentNames } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleNames } from 'meta/assessment/cycle/names'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { Logger } from 'server/utils/logger'

const assessmentName = AssessmentNames.panEuropean
const cycleName = CycleNames._2025
const tableName = 'table_2_4'
const variableName = 'forest_2022'
// The formula sums the unspecified mixed damage column of the 2020 cycle, which is always empty in 2025
const wrongColumn = "['unspecified_mixed_damage']"
const rightColumn = "['unspecified_mixed_damage_2025']"

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
      (
        select jsonb_agg(replace(validateFn, $(wrongColumn), $(rightColumn)))
        from jsonb_array_elements_text(r.props -> 'validateFns' -> $(cycleUuid)) as validateFn
      )
    )
    from ${schemaName}.table t
    where r.table_uuid = t.uuid
      and t.props ->> 'name' = $(tableName)
      and r.props ->> 'variableName' = $(variableName)
      and r.props -> 'validateFns' ? $(cycleUuid)
      and (r.props -> 'validateFns' -> $(cycleUuid))::text like $(pattern)
    `,
    { cycleUuid: cycle.uuid, pattern: `%${wrongColumn}%`, rightColumn, tableName, variableName, wrongColumn },
    (result) => result.rowCount
  )
  Logger.info(
    `step-update-validations-panEuropean-table-2-4-forest-2022: cycle ${cycle.name}: ${rowCount} rows updated`
  )
}

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'

import { CacheController } from 'server/cache/controller'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

const assessmentName = AssessmentNames.fra
const cycleNames = [CycleNames._2025, CycleNames.latest]
const tableName = 'areaAffectedByFire'
const variableName = 'of_which_on_forest'
const validateFn =
  'validatorSubCategory(areaAffectedByFire.total_land_area_affected_by_fire,[areaAffectedByFire.of_which_on_forest], 0)'

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycles = assessment.cycles.filter((cycle) => cycleNames.includes(cycle.name as CycleNames))

  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  await Promise.all(
    cycles.map((cycle) =>
      client.none(
        `
        update ${schemaName}.row r
        set props = jsonb_set(
          r.props,
          '{validateFns,${cycle.uuid}}',
          (r.props -> 'validateFns' -> '${cycle.uuid}') || '["${validateFn}"]'::jsonb
        )
        from ${schemaName}.table t
        where r.table_uuid = t.uuid
          and t.props ->> 'name' = '${tableName}'
          and r.props ->> 'variableName' = '${variableName}'
          -- use @> to check that the validateFns doesn't already exist in valiteFns array
          and not r.props -> 'validateFns' -> '${cycle.uuid}' @> '["${validateFn}"]'::jsonb
        `
      )
    )
  )

  await CacheController.generateMetadata({ assessment }, client)
}

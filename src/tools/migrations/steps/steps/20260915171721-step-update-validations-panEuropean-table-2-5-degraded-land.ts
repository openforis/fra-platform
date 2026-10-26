import { AssessmentNames } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleNames } from 'meta/assessment/cycle/names'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { Logger } from 'server/utils/logger'

const assessmentName = AssessmentNames.panEuropean
const cycleName = CycleNames._2025
const tableName = 'table_2_5'
const years = ['1990', '2000', '2005', '2010', '2015', '2020']

// Every forest row validated forest_2020 and read two columns that don't exist, total_area_of_degraded_land and AgentFour
const getValidateFn = (year: string): string =>
  `validatorEqualToSum(table_2_5.forest_${year}['totalAreaOfDegradedLand'], [table_2_5.forest_${year}['agentOne'], table_2_5.forest_${year}['agentTwo'], table_2_5.forest_${year}['agentThree'], table_2_5.forest_${year}['agentFour'], table_2_5.forest_${year}['agentFive'], table_2_5.forest_${year}['unknownMixedDegradation']])`

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycle = Assessments.getCycle({ assessment, cycleName })
  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  await Promise.all(
    years.map(async (year) => {
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
        { cycleUuid: cycle.uuid, tableName, validateFn: getValidateFn(year), variableName: `forest_${year}` },
        (result) => result.rowCount
      )
      Logger.info(
        `step-update-validations-panEuropean-table-2-5-degraded-land: forest_${year}: ${rowCount} rows updated`
      )
    })
  )
}

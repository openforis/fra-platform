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
const tableName = 'table_2_4'
const colName = 'disease'
const years = ['1990', '2000', '2005', '2010', '2015', '2020']

// The disease check passed its labels as raw cell names, which the message showed as they are
const getValidateFn = (year: string): string =>
  `validatorEqualToSum(table_2_4.total_forest_and_other_wooded_land_${year}['disease'], [table_2_4.forest_${year}['disease'],table_2_4.other_wooded_land_${year}['disease']], "panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land_only", "panEuropean.forestAreaWithDamage.disease", "2.4", ["panEuropean.forestAreaWithDamage.forest_only", "panEuropean.forestAreaWithDamage.other_wooded_land_only"])`

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycle = Assessments.getCycle({ assessment, cycleName })
  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  await Promise.all(
    years.map(async (year) => {
      const variableName = `total_forest_and_other_wooded_land_${year}`
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
        { colName, cycleUuid: cycle.uuid, tableName, validateFn: getValidateFn(year), variableName },
        (result) => result.rowCount
      )
      Logger.info(`step-update-validations-panEuropean-table-2-4-labels: ${variableName}: ${rowCount} columns updated`)
    })
  )

  await CacheController.generateMetaCache({}, client)
  await CacheController.generateMetadata({ assessment }, client)
}

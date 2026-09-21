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
const tableName = 'table_5_1'
const years = ['1990', '2000', '2005', '2010', '2015', '2020', '2025']
const colNames = [
  'total',
  'infrastructure_and_managed_natural_resources',
  'soil_water_and_other_forest_ecosystem_functions',
]

// The formulas of the total rows were rotated, each column checked the sum of another column
const getValidateFn = (year: string, colName: string): string =>
  `validatorEqualToSum(table_5_1.total_forest_and_other_wooded_land_${year}['${colName}'], [table_5_1.forest_${year}['${colName}'],table_5_1.other_wooded_land_${year}['${colName}']])`

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycle = Assessments.getCycle({ assessment, cycleName })
  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  await Promise.all(
    years.map(async (year) => {
      const variableName = `total_forest_and_other_wooded_land_${year}`
      const rowCounts = await Promise.all(
        colNames.map((colName) =>
          client.result(
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
            { colName, cycleUuid: cycle.uuid, tableName, validateFn: getValidateFn(year, colName), variableName },
            (result) => result.rowCount
          )
        )
      )
      const rowCount = rowCounts.reduce((total, count) => total + count, 0)
      Logger.info(`step-update-validations-panEuropean-table-5-1-total: ${variableName}: ${rowCount} columns updated`)
    })
  )

  await CacheController.generateMetaCache({}, client)
  await CacheController.generateMetadata({ assessment }, client)
}

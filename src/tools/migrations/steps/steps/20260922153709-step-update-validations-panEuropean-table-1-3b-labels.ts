import { AssessmentNames } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleNames } from 'meta/assessment/cycle/names'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { Logger } from 'server/utils/logger'

const assessmentName = AssessmentNames.panEuropean
const cycleName = CycleNames._2025
const tableName = 'table_1_3b'
const colName = 'area'
const years = ['1990', '2000', '2005', '2010', '2015', '2020']

// The stand labels had a {{year}} in them that the message can't fill, so the area check now uses the labels without the year
const getValidateFn = (year: string): string =>
  `validatorEqualToSum(table_1_1a.forest_${year}['area'], [table_1_3a1.forest_even_aged_stands_of_which_${year}['total_area'], table_1_3b.forest_uneven_aged_stands_${year}['area']], "panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.forest", "panEuropean.forestArea.area1000Ha", "1.1.I", ["panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_uneven_aged"])`

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycle = Assessments.getCycle({ assessment, cycleName })
  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  await Promise.all(
    years.map(async (year) => {
      const variableName = `forest_uneven_aged_stands_${year}`
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
      Logger.info(`step-update-validations-panEuropean-table-1-3b-labels: ${variableName}: ${rowCount} columns updated`)
    })
  )
}

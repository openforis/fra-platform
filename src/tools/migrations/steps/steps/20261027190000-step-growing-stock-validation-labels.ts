import { AssessmentNames } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleNames } from 'meta/assessment/cycle/names'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { Logger } from 'server/utils/logger'

const assessmentName = AssessmentNames.panEuropean
const cycleName = CycleNames._2025
const tableName = 'table_1_2a'
const years = ['1990', '2000', '2005', '2010', '2015', '2020', '2025']
const rowLabels: Record<string, string> = {
  forest: 'Forest',
  _of_which_available_for_wood_supply: 'panEuropean.growingStock.of_which_available_for_wood_supply_only',
  other_wooded_land: 'panEuropean.growingStock.other_wooded_land_only',
  total_forest_and_other_wooded_land: 'panEuropean.growingStock.total_forest_and_other_wooded_land_only',
}
const columnLabels = '["panEuropean.growingStock.coniferous", "panEuropean.growingStock.broadleaved"]'
const categoryLabels = '["Forest", "panEuropean.growingStock.other_wooded_land_only"]'

// The checks omitted subcategory labels from their validation messages
// Coniferous plus broadleaved must equal the total of each row
const getRowFn = (variableName: string, parentLabel: string): string =>
  `validatorEqualToSum(table_1_2a.${variableName}['total'], [table_1_2a.${variableName}['coniferous'],table_1_2a.${variableName}['broadleaved']], "${parentLabel}", "panEuropean.growingStock.total", "1.2.I", ${columnLabels})`

// Forest plus other wooded land must equal the combined total of each column
const getTotalFn = (year: string, colName: string): string =>
  `validatorEqualToSum(table_1_2a.total_forest_and_other_wooded_land_${year}['${colName}'], [table_1_2a.forest_${year}['${colName}'],table_1_2a.other_wooded_land_${year}['${colName}']], "panEuropean.growingStock.total_forest_and_other_wooded_land_only", "panEuropean.growingStock.${colName}", "1.2.I", ${categoryLabels})`

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycle = Assessments.getCycle({ assessment, cycleName })
  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  await Promise.all(
    years.flatMap((year) =>
      Object.keys(rowLabels).map(async (name) => {
        const variableName = `${name}_${year}`
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
          {
            cycleUuid: cycle.uuid,
            tableName,
            validateFn: getRowFn(variableName, rowLabels[name]),
            variableName,
          },
          (result) => result.rowCount
        )
        Logger.info(`step-growing-stock-validation-labels: ${variableName}: ${rowCount} rows updated`)
      })
    )
  )

  await Promise.all(
    years.flatMap((year) =>
      ['total', 'coniferous', 'broadleaved'].map(async (colName) => {
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
          {
            colName,
            cycleUuid: cycle.uuid,
            tableName,
            validateFn: getTotalFn(year, colName),
            variableName,
          },
          (result) => result.rowCount
        )
        Logger.info(`step-growing-stock-validation-labels: ${variableName} ${colName}: ${rowCount} columns updated`)
      })
    )
  )
}

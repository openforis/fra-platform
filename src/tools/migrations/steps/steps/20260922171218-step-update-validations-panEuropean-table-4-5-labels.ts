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
const tableName = 'table_4_5'
const years = ['2015', '2020']
const species = ['coniferous', 'broadleaved']
const speciesLabels = '["panEuropean.deadwood.coniferous_only", "panEuropean.deadwood.broadleaved_only"]'
const columnLabels = '["panEuropean.deadwood.standing", "panEuropean.deadwood.lying"]'

// These formulas passed raw cell names as labels, so the message showed them as they are
// Standing plus lying must equal the total of the species
const getSpeciesFn = (year: string, name: string): string =>
  `validatorEqualToSum(table_4_5.${name}_${year}['total'], [table_4_5.${name}_${year}['standing'],table_4_5.${name}_${year}['lying']], "panEuropean.deadwood.${name}_only", "panEuropean.deadwood.total", "4.5", ${columnLabels})`

// Coniferous plus broadleaved must equal the total forest and other wooded land of the column
const getTotalFn = (year: string, col: string): string =>
  `validatorEqualToSum(table_4_5.total_forest_and_other_wooded_land_${year}['${col}'], [table_4_5.coniferous_${year}['${col}'],table_4_5.broadleaved_${year}['${col}']], "panEuropean.deadwood.total_forest_and_other_wooded_land_only", "panEuropean.deadwood.${col}", "4.5", ${speciesLabels})`

// Standing and lying check the species total, and the coniferous cells also check the column total
const getValidateFns = (year: string, name: string, col: string): Array<string> => {
  const validateFns: Array<string> = []
  if (col !== 'total') validateFns.push(getSpeciesFn(year, name))
  if (name === 'coniferous') validateFns.push(getTotalFn(year, col))
  return validateFns
}

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycle = Assessments.getCycle({ assessment, cycleName })
  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  await Promise.all(
    years.flatMap((year) =>
      species.flatMap((name) =>
        ['total', 'standing', 'lying'].map(async (colName) => {
          const validateFns = getValidateFns(year, name, colName)
          if (validateFns.length === 0) return

          const variableName = `${name}_${year}`
          const rowCount = await client.result(
            `
            update ${schemaName}.col c
            set props = jsonb_set(
              c.props,
              array['validateFns', $(cycleUuid)],
              to_jsonb(array[$(validateFns:csv)])
            )
            from ${schemaName}.row r, ${schemaName}.table t
            where c.row_uuid = r.uuid
              and r.table_uuid = t.uuid
              and t.props ->> 'name' = $(tableName)
              and r.props ->> 'variableName' = $(variableName)
              and c.props ->> 'colName' = $(colName)
              and c.props -> 'validateFns' ? $(cycleUuid)
            `,
            { colName, cycleUuid: cycle.uuid, tableName, validateFns, variableName },
            (result) => result.rowCount
          )
          Logger.info(
            `step-update-validations-panEuropean-table-4-5-labels: ${variableName} ${colName}: ${rowCount} columns updated`
          )
        })
      )
    )
  )

  await CacheController.generateMetaCache({}, client)
  await CacheController.generateMetadata({ assessment }, client)
}

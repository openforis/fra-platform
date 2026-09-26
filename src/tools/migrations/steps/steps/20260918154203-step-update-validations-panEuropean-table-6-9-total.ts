import { AssessmentNames } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleNames } from 'meta/assessment/cycle/names'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { Logger } from 'server/utils/logger'

const assessmentName = AssessmentNames.panEuropean
const cycleName = CycleNames._2025
const tableName = 'table_6_9'
const variableName = 'total_energy_supply_from_wood'
const years = ['2007', '2009', '2011', '2013', '2015', '2019', '2021']
const units = ['tj', '_1000_metric_tonnes_dry_matter']
// The total summed the four sources and their "of which" rows, counting those twice
const sources = [
  'energy_from_direct_wood_fibre_sources',
  'energy_from_co_products',
  'energy_from_processed_wood_based_fuels',
  'energy_from_post_consumer_recovered_wood',
  'energy_from_unknown_unspecified_sources',
]

const getValidateFn = (colName: string): string => {
  const categories = sources.map((source) => `table_6_9.${source}['${colName}']`).join(', ')
  return `validatorEqualToSum(table_6_9.${variableName}['${colName}'], [${categories}])`
}

// One formula per year and unit, in the column order of the table
const validateFns = years.flatMap((year) => units.map((unit) => getValidateFn(`${unit}_${year}`)))

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
      to_jsonb(array[$(validateFns:csv)])
    )
    from ${schemaName}.table t
    where r.table_uuid = t.uuid
      and t.props ->> 'name' = $(tableName)
      and r.props ->> 'variableName' = $(variableName)
      and r.props -> 'validateFns' ? $(cycleUuid)
    `,
    { cycleUuid: cycle.uuid, tableName, validateFns, variableName },
    (result) => result.rowCount
  )
  Logger.info(`step-update-validations-panEuropean-table-6-9-total: cycle ${cycle.name}: ${rowCount} rows updated`)
}

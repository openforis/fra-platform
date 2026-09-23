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
const tableName = 'table_1_3a2'
const years = ['1990', '2000', '2005', '2010', '2015', '2020']
const phases = ['intermediate_phase', 'mature_phase', 'regeneration_phase', 'unspecified']
const forestTypes = ['predominantly_coniferous_forest', 'mixed_forest', 'predominantly_broadleaved_forest']

// The parent label had a {{year}} in it that the message can't fill, so the phases now use the label without the year
const getValidateFn = (year: string, phase: string): string => {
  const parent = `table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_${year}['${phase}']`
  const categories = forestTypes.map((forestType) => `table_1_3a2.${forestType}_${year}['${phase}']`).join(', ')
  return `validatorEqualToSum(${parent}, [${categories}], "panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_available_even_aged", "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.${phase}", "1.3a2")`
}

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycle = Assessments.getCycle({ assessment, cycleName })
  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  await Promise.all(
    years.flatMap((year) =>
      phases.map(async (phase) => {
        const variableNames = forestTypes.map((forestType) => `${forestType}_${year}`)
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
            and r.props ->> 'variableName' in ($(variableNames:csv))
            and c.props ->> 'colName' = $(phase)
            and c.props -> 'validateFns' ? $(cycleUuid)
          `,
          { cycleUuid: cycle.uuid, phase, tableName, validateFn: getValidateFn(year, phase), variableNames },
          (result) => result.rowCount
        )
        Logger.info(
          `step-update-validations-panEuropean-table-1-3a2-labels: ${year} ${phase}: ${rowCount} columns updated`
        )
      })
    )
  )

  await CacheController.generateMetaCache({}, client)
  await CacheController.generateMetadata({ assessment }, client)
}

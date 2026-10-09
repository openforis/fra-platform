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
const tableName = 'table_6_1'
const years = ['1990', '2000', '2005', '2010', '2015', '2020']
const ownerships: Record<string, string> = {
  in_private_ownership: 'private_ownership',
  in_public_ownership: 'public_ownership',
  other_types_of_ownership_unknown: 'other',
}
// The size classes are reported as an area and as a number of holdings, each with its own total
const measures: Record<string, string> = { area: 'total_forest_area', number: 'total_number_of_holdings' }
const sizeClasses = ['less_10_ha', '_11_500_ha', 'more_500_ha']
const sizeClassLabels =
  '["panEuropean.forestHoldings.less10ha", "panEuropean.forestHoldings._11_500ha", "panEuropean.forestHoldings.more500ha"]'

// These formulas passed raw cell names as labels, so the message showed them as they are
// The three size classes must add up to the total of the row
const getValidateFn = (variableName: string, ownership: string, measure: string): string => {
  const parent = `table_6_1.${variableName}['${measures[measure]}']`
  const categories = sizeClasses.map((sizeClass) => `table_6_1.${variableName}['${sizeClass}_${measure}']`).join(', ')
  return `validatorEqualToSum(${parent}, [${categories}], "panEuropean.forestHoldings.${ownerships[ownership]}", "panEuropean.forestHoldings.${measures[measure]}", "6.1", ${sizeClassLabels})`
}

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycle = Assessments.getCycle({ assessment, cycleName })
  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  await Promise.all(
    years.flatMap((year) =>
      Object.keys(ownerships).flatMap((ownership) =>
        Object.keys(measures).map(async (measure) => {
          const variableName = `${ownership}_${year}`
          const colNames = sizeClasses.map((sizeClass) => `${sizeClass}_${measure}`)
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
              and c.props ->> 'colName' in ($(colNames:csv))
              and c.props -> 'validateFns' ? $(cycleUuid)
            `,
            {
              colNames,
              cycleUuid: cycle.uuid,
              tableName,
              validateFn: getValidateFn(variableName, ownership, measure),
              variableName,
            },
            (result) => result.rowCount
          )
          Logger.info(
            `step-update-validations-panEuropean-table-6-1-labels: ${variableName} ${measure}: ${rowCount} columns updated`
          )
        })
      )
    )
  )

  await CacheController.generateMetaCache({}, client)
  await CacheController.generateMetadata({ assessment }, client)
}

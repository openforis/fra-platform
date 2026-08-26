import { AssessmentNames } from 'meta/assessment/assessment'
import { TableNames } from 'meta/assessment/table'

import { CacheController } from 'server/cache/controller'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { Logger } from 'server/utils/logger'

const assessmentName = AssessmentNames.fra
const tableName = TableNames.otherLandWithTreeCover
const variableNames = ['palms', 'tree_orchards', 'agroforestry', 'trees_in_urban_settings', 'other']

// pass the raw category values so the validator can tell whether the year has any reported data
const newValidateFn =
  'validatorRemainingLandWithTreeCoverTotal([otherLandWithTreeCover.palms, otherLandWithTreeCover.tree_orchards, otherLandWithTreeCover.agroforestry, otherLandWithTreeCover.trees_in_urban_settings, otherLandWithTreeCover.other], extentOfForest.otherLand)'

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  await Promise.all(
    assessment.cycles.map(async (cycle) => {
      const rowCount = await client.result(
        `
        update ${schemaName}.row r
        set props = jsonb_set(
          r.props,
          array['validateFns', $(cycleUuid)],
          to_jsonb(array[$(newValidateFn)])
        )
        from ${schemaName}.table t
        where r.table_uuid = t.uuid
          and t.props ->> 'name' = $(tableName)
          and r.props ->> 'variableName' in ($(variableNames:csv))
          and r.props -> 'validateFns' ? $(cycleUuid)
        `,
        { cycleUuid: cycle.uuid, newValidateFn, tableName, variableNames },
        (result) => result.rowCount
      )
      Logger.info(`step-update-validations-otherLandWithTreeCover: cycle ${cycle.name}: ${rowCount} rows updated`)
    })
  )

  await CacheController.generateMetaCache({}, client)
  await CacheController.generateMetadata({ assessment }, client)
}

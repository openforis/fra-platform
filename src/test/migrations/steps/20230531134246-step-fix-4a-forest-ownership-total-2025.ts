import { AssessmentController } from '@server/controller/assessment'
import { BaseProtocol, Schemas } from '@server/db'

import { runCalculations } from './utils/runCalculations'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025', metaCache: true },
    client
  )

  const schemaName = Schemas.getName(assessment)

  const tableName = 'forestOwnership'

  const variableName = 'total'

  const formula =
    '(forestOwnership.private_ownership || forestOwnership.public_ownership || forestOwnership.other || forestOwnership.unknown) ? (forestOwnership.private_ownership || 0) + (forestOwnership.public_ownership || 0) + (forestOwnership.other || 0) + (forestOwnership.private_ownership || forestOwnership.public_ownership ? Math.max(0, (extentOfForest.forestArea - (forestOwnership.private_ownership || 0) - (forestOwnership.public_ownership || 0) - (forestOwnership.other || 0))) : null) : null'

  await client.query(
    `
      update ${schemaName}.row r
      set props = jsonb_set(r.props, '{calculateFn,${cycle.uuid}}', '"${formula}"')
      where id = (
        select id from ${schemaName}.row r
        where r.props->>'variableName' = $2
          and table_id = (
            select id from ${schemaName}.table where props->>'name' = $1
          )
      );
    `,
    [tableName, variableName]
  )

  await AssessmentController.generateMetaCache(
    {
      assessment,
      cycle,
    },
    client
  )

  await runCalculations(
    {
      assessment,
      cycle,
      variableName,
      tableName,
    },
    client
  )
}

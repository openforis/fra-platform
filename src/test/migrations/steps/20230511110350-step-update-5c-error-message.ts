import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import { AssessmentCycleUtil } from 'test/migrations/steps/utils/getAssessmentCycle'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)
  const schemaName = Schemas.getName(assessment)

  const row = await client.one(`select r.* from ${schemaName}.table t left join ${schemaName}.row r on t.id = r.table_id
                                  where t.props ->> 'name' = 'degradedForestMonitoring2025'
                                    and r.props ->> 'variableName' = 'degradedAreaForThatYear'
  `)

  await client.query(
    `
        update ${schemaName}.row r
        set props = props || jsonb_build_object('validateFns', jsonb_build_object($2, $3))
        where id = $1
        returning *`,
    [
      row.id,
      cycle.uuid,
      ['validatorNotGreaterThanMaxForest(maxForestArea(),degradedForestMonitoring2025.degradedAreaForThatYear)'],
    ]
  )

  await AssessmentController.generateMetaCache(
    {
      assessment,
      cycle,
    },
    client
  )
}

import { Assessment, Cycle } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import { runCalculations } from 'test/migrations/steps/utils/runCalculations'

export const updateRowCalculateFn = async (
  props: { assessment: Assessment; cycle: Cycle; formula: string; tableName: string; variableName: string },
  client: BaseProtocol
) => {
  const { assessment, cycle, formula, tableName, variableName } = props
  const schemaName = Schemas.getName(assessment)

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

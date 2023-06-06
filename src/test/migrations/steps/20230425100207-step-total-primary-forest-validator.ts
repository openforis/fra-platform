import { Row, Table } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName: 'fra', cycleName: '2025' }, client)

  const schemaName = Schemas.getName(assessment)

  const table = await client.one<Table>(`select * from ${schemaName}.table where props->>'name' = $1;`, 'primaryForestByClimaticDomain')

  const row = await client.one<Row>(
    `select * from ${schemaName}.row r where r.props->>'variableName' = 'totalPrimaryForest' and table_id = $1;`,
    table.id
  )

  await client.query(
    `update ${schemaName}.row r set props = jsonb_set(r.props, '{validateFns, ${cycle.uuid}}',
    ('[
      "(!primaryForestByClimaticDomain.primaryForestBoreal || !primaryForestByClimaticDomain.primaryForestTemperate || !primaryForestByClimaticDomain.primaryForestSubTropical || !primaryForestByClimaticDomain.primaryForestTropical) ? validatorSumNotGreaterThan(primaryForestByClimaticDomain.totalPrimaryForest, forestCharacteristics.primaryForest, true) : validatorEqualToPrimaryForest(forestCharacteristics.primaryForest, [(primaryForestByClimaticDomain.primaryForestBoreal || 0), (primaryForestByClimaticDomain.primaryForestTemperate || 0), (primaryForestByClimaticDomain.primaryForestSubTropical || 0), (primaryForestByClimaticDomain.primaryForestTropical || 0)])"
    ]'::text)::jsonb)
    where id = $1;`,
    row.id
  )

  await AssessmentController.generateMetaCache(
    {
      assessment,
      cycle,
    },
    client
  )
}

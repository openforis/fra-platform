import { Row, Table } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )

  const schemaName = Schemas.getName(assessment)

  const table = await client.one<Table>(
    `select * from ${schemaName}.table where props->>'name' = $1;`,
    'sustainableDevelopment15_2_1_3'
  )

  const row = await client.one<Row>(
    `select * from ${schemaName}.row r where r.props->>'type' = 'data' and table_id = $1;`,
    table.id
  )

  await client.query(
    `update ${schemaName}.row r set props = jsonb_set(r.props, '{validateFns, ${cycle.uuid}}',
    ('[
      "validatorNotGreaterThan(sustainableDevelopment15_2_1_3.proportionForestAreaLegallyEstablishedProtectedAreas,''101'')"
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

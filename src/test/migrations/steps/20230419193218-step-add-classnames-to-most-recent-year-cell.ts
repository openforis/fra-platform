import { Row, Table } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )

  const schemaName = Schemas.getName(assessment)

  const table = await client.one<Table>(`select * from ${schemaName}.table where props->>'name' = $1;`, [
    'growingStockComposition2025',
  ])

  const row = await client.one<Row>(
    `select * from ${schemaName}.row r where r.props->>'variableName' = 'mostRecentYear' and table_id = $1;`,
    table.id
  )

  await client.query(
    `update ${schemaName}.col c set props = jsonb_set(c.props, '{classNames,${cycle.uuid}}', '["text-end", "font-weight-bold"]') where c.props->>'colType' = 'header' and row_id = $1;`,
    row.id
  )
}

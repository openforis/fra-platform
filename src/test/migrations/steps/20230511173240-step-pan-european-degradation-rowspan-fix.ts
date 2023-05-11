import { Row, Table } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { BaseProtocol, Schemas } from '@server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'panEuropean', cycleName: '2025' },
    client
  )

  const schemaName = Schemas.getName(assessment)

  const table = await client.one<Table>(`select * from ${schemaName}.table where props->>'name' = $1;`, 'table_2_5')

  const row = await client.one<Row>(
    `select * from ${schemaName}.row r where r.props->>'index' = 'header_0' and table_id = $1;`,
    table.id
  )

  await client.query(
    `update ${schemaName}.col c set props = jsonb_set(c.props, '{style,${cycle.uuid},rowSpan}', '14') where c.props->>'index' = '0' and row_id = $1;`,
    row.id
  )
}

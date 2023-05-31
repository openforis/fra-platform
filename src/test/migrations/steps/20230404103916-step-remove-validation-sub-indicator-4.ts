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
    'sustainableDevelopment15_2_1_4',
  ])

  const rowData = await client.one<Row>(
    `select * from ${schemaName}.row r where r.props->>'type' = 'data' and table_id = $1;`,
    table.id
  )

  await client.query(`update ${schemaName}.row r set props = props - 'validateFns' where id = $1;`, rowData.id)

  await AssessmentController.generateMetaCache(
    {
      assessment,
      cycle,
    },
    client
  )
}

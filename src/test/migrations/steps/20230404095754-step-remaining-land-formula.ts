import { Row, Table } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import { runCalculations } from './utils/runCalculations'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025', metaCache: true },
    client
  )

  const schemaName = Schemas.getName(assessment)

  const table = await client.one<Table>(`select * from ${schemaName}.table where props->>'name' = $1;`, [
    'extentOfForest',
  ])

  const row = await client.one<Row>(
    `select * from ${schemaName}.row r where r.props->>'type' = 'data' and r.props->>'index' = '2' and table_id = $1;`,
    table.id
  )

  const formula =
    'extentOfForest.forestArea || extentOfForest.otherWoodedLand ? extentOfForest.totalLandArea - (extentOfForest.forestArea || 0) - (extentOfForest.otherWoodedLand || 0) : null'

  await client.query(
    `update ${schemaName}.row r set props = jsonb_set(r.props, '{calculateFn,${cycle.uuid}}', '"${formula}"') where id = $1;`,
    row.id
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
      variableName: 'otherLand',
      tableName: 'extentOfForest',
    },
    client
  )
}

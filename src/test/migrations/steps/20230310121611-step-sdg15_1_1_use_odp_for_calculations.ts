import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    {
      assessmentName: 'fra',
      cycleName: '2025',
    },
    client
  )

  const schemaName = Schemas.getName(assessment)

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const nodeMetadata = await client.map(
    `
      select c.* from ${schemaName}.col c
      left join ${schemaName}.row r on r.id = c.row_id
      left join ${schemaName}.table t on t.id = r.table_id
      where t.props ->> 'name' ilike 'sustainableDevelopment15_1_1'
      and r.props ->> 'type' != 'header'
        and c.props ->> 'colName' between '2021' and  '2024'
        `,
    [],
    (column) => {
      const calculateFnOriginal = column.props.calculateFn[cycle.uuid]
      // eslint-disable-next-line no-param-reassign
      column.props.calculateFn[
        cycle.uuid
      ] = `extentOfForest.forestArea['${column.props.colName}'] ? extentOfForest.forestArea['${column.props.colName}'] / extentOfForest.totalLandArea['${column.props.colName}'] * 100 : (${calculateFnOriginal})`
      return column
    }
  )

  for (let i = 0; i < nodeMetadata.length; i += 1) {
    const node = nodeMetadata[i]
    // eslint-disable-next-line no-await-in-loop
    await client.one(
      `
      UPDATE ${schemaName}.col
      SET props = props || $1::jsonb
      WHERE id = $2::bigint returning *;
  `,
      [JSON.stringify(node.props), node.id]
    )
  }
}

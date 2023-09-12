import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025', metaCache: true },
    client
  )

  const schemaName = Schemas.getName(assessment)

  const labelsToChange = [
    {
      label: 'fra.growingStock.plantationForest2025',
      tableName: 'forestCharacteristics',
      variableName: 'plantationForestArea',
      colType: 'header',
    },
    {
      label: 'fra.growingStock.plantationForest2025',
      tableName: 'growingStockAvg',
      variableName: 'plantationForest',
      colType: 'header',
    },
    {
      label: 'fra.growingStock.plantationForest2025',
      tableName: 'growingStockTotal',
      variableName: 'plantationForest',
      colType: 'header',
    },
  ]

  await Promise.all(
    labelsToChange.map((labelToChange) => {
      const { label, tableName, variableName, colType } = labelToChange

      return client.query(
        `
        update ${schemaName}.col
        set props = jsonb_set(props, '{labels,"${cycle.uuid}",key}', '"${label}"')
        where id in (
          select c.id
          from  ${schemaName}.table t
            left join ${schemaName}.row r on t.id = r.table_id
            left join ${schemaName}.col c on r.id = c.row_id
          where t.props ->> 'name' = $1
            and r.props ->> 'variableName' = $2
            and c.props ->> 'colType' = $3
        );
      `,
        [tableName, variableName, colType]
      )
    })
  )
}

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName: 'fra', cycleName: '2025' }, client)

  const schemaName = Schemas.getName(assessment)

  const cell = await client.one(`select c.id, c.props
                                 from ${schemaName}.row r
                                          left join ${schemaName}.col c on r.id = c.row_id
                                 where c.props ->> 'colName' = 'growingStockPercent'
                                   and r.props ->> 'variableName' = 'remainingIntroduced'`)

  const { props, id } = cell

  props.calculateFn[cycle.uuid] =
    "growingStockComposition2025.remainingIntroduced['growingStockMillionCubicMeter'] / growingStockComposition2025.totalGrowingStock['growingStockMillionCubicMeter'] * 100"

  await client.one(
    `
      UPDATE ${schemaName}.col
      SET props = props || $1::jsonb
      WHERE id = $2::bigint returning *;
  `,
    [JSON.stringify(props), id]
  )
}

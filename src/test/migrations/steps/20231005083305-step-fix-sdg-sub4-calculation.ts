import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { ColProps } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )

  const schemaName = Schemas.getName(assessment)

  // update calculateFn for:
  const cols = await client.many<{ id: number; props: ColProps }>(`select c.id, c.props
  from assessment_fra.table t
           left join ${schemaName}.row r on t.id = r.table_id
           left join ${schemaName}.col c on r.id = c.row_id
  where t.props ->> 'name' = 'sustainableDevelopment15_2_1_4'
  and r.props ->> 'variableName' = 'proportionForestAreaLongTermForestManagement'
  and c.props ->> 'colType' = 'calculated'
-- calculate fn for cycle uuid must not be null
  and c.props -> 'calculateFn' ->> '${cycle.uuid}' is not null;`)

  const updatedCols = cols.map((col) => {
    const { props } = col
    const calculateFn = `forestAreaWithinProtectedAreas.forest_area_with_long_term_management_plan ? ${
      props.calculateFn[cycle.uuid]
    } : null`

    return Objects.setInPath({
      obj: col,
      path: ['props', 'calculateFn', cycle.uuid],
      value: calculateFn,
    })
  })

  const pgp = pgPromise()
  const columns = [
    '?id',
    {
      name: 'props',
      cast: 'jsonb',
    },
  ]
  const cs = new pgp.helpers.ColumnSet(columns, {
    table: { table: 'col', schema: schemaName },
  })

  const query = `${pgp.helpers.update(updatedCols, cs)} WHERE v.id = t.id`
  await client.query(query)

  await AssessmentController.generateMetaCache(
    {
      assessment,
      cycle,
    },
    client
  )
}

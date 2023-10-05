import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { ColProps } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import { runCalculations } from 'test/migrations/steps/utils/runCalculations'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025', metaCache: true },
    client
  )

  const schemaName = Schemas.getName(assessment)

  const cols = await client.many<{ id: number; props: ColProps }>(
    `
  select c.id, c.props
  from assessment_fra.table t
           left join ${schemaName}.row r on t.id = r.table_id
           left join ${schemaName}.col c on r.id = c.row_id
  where t.props ->> 'name' = 'sustainableDevelopment15_2_1_4'
  and r.props ->> 'variableName' = 'proportionForestAreaLongTermForestManagement'
  and c.props ->> 'colType' = 'calculated'
  and c.props -> 'calculateFn' ->> '${cycle.uuid}' is not null;
  `
  )

  const updatedCols = cols.map((col) => {
    const calculateFn = `forestAreaWithinProtectedAreas.forest_area_with_long_term_management_plan && extentOfForest.forestArea["2015"] ? forestAreaWithinProtectedAreas.forest_area_with_long_term_management_plan / extentOfForest.forestArea["2015"] * 100 : null`
    const path = ['props', 'calculateFn', cycle.uuid]
    const params = { obj: col, path, value: calculateFn }
    return Objects.setInPath(params)
  })

  const pgp = pgPromise()
  const columns = [
    '?id',
    {
      name: 'props',
      cast: 'jsonb',
    },
  ]
  const options = { table: { table: 'col', schema: schemaName } }
  const cs = new pgp.helpers.ColumnSet(columns, options)

  const query = `${pgp.helpers.update(updatedCols, cs)} WHERE v.id = t.id`

  await client.query(query)

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
      variableName: 'proportionForestAreaLongTermForestManagement',
      tableName: 'sustainableDevelopment15_2_1_4',
    },
    client
  )
}

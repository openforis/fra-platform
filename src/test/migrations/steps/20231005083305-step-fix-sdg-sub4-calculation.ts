import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { ColProps } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { RedisData } from 'server/repository/redis/redisData'

import { updateCalculatedVariable } from 'test/migrations/steps/utils/updateCalculatedVariable'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra', metaCache: true }, client)

  const schemaName = Schemas.getName(assessment)
  const cycle2020 = assessment.cycles.find((c) => c.name === '2020')
  const cycle2025 = assessment.cycles.find((c) => c.name === '2025')

  const cols = await client.many<{ id: number; props: ColProps }>(
    `
  select t.props ->> 'name' as "tableName", r.props ->> 'variableName' as "variableName", c.props ->> 'colName' as "colName",  c.id, c.props
  from assessment_fra.table t
           left join ${schemaName}.row r on t.id = r.table_id
           left join ${schemaName}.col c on r.id = c.row_id
  where t.props ->> 'name' = 'sustainableDevelopment15_2_1_4'
  and r.props ->> 'variableName' = 'proportionForestAreaLongTermForestManagement'
  and c.props ->> 'colType' = 'calculated'
  and (c.props -> 'calculateFn' ->> '${cycle2020.uuid}' is not null or c.props -> 'calculateFn' ->> '${cycle2025.uuid}' is not null)
  `
  )

  const updatedCols = cols.map((col) => {
    let _col = Objects.cloneDeep(col)
    const valuesExist = `forestAreaWithinProtectedAreas.forest_area_with_long_term_management_plan && extentOfForest.forestArea["2015"]`
    const formula = `Math.min(forestAreaWithinProtectedAreas.forest_area_with_long_term_management_plan / extentOfForest.forestArea["2015"] * 100, 100)`
    const calculateFn = `${valuesExist} ? ${formula} : null`

    if (col.props.calculateFn[cycle2020.uuid]) {
      const path = ['props', 'calculateFn', cycle2020.uuid]
      const params = { obj: _col, path, value: calculateFn }
      _col = Objects.setInPath(params)
    }

    if (col.props.calculateFn[cycle2025.uuid]) {
      const path = ['props', 'calculateFn', cycle2025.uuid]
      const params = { obj: _col, path, value: calculateFn }
      _col = Objects.setInPath(params)
    }

    return _col
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
      cycle: cycle2025,
    },
    client
  )

  await AssessmentController.generateMetaCache(
    {
      assessment,
      cycle: cycle2020,
    },
    client
  )

  // TODO: It is showing old values (mainly the calculation formula) in redis
  // -- flush redis
  await RedisData.getInstance().flushall()

  await updateCalculatedVariable(
    {
      assessment,
      cycle: cycle2025,
      variableName: 'proportionForestAreaLongTermForestManagement',
      tableName: 'sustainableDevelopment15_2_1_4',
    },
    client
  )

  await updateCalculatedVariable(
    {
      assessment,
      cycle: cycle2020,
      variableName: 'proportionForestAreaLongTermForestManagement',
      tableName: 'sustainableDevelopment15_2_1_4',
    },
    client
  )
}

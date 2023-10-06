import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { Assessment, ColProps, Cycle } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

type _updateCalculationFnParams = { assessment: Assessment; cycle: Cycle }
const _updateCalculationFn = async (props: _updateCalculationFnParams, client: BaseProtocol) => {
  const { assessment, cycle } = props

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
    const valuesExist = `forestAreaWithinProtectedAreas.forest_area_with_long_term_management_plan && extentOfForest.forestArea["2015"]`
    const formula = `Math.min(forestAreaWithinProtectedAreas.forest_area_with_long_term_management_plan / extentOfForest.forestArea["2015"] * 100, 100)`
    const calculateFn = `${valuesExist} ? ${formula} : null`
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

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const query = `${pgp.helpers.update(updatedCols, cs)} WHERE v.id = t.id`

  // await client.query(query)
  //
  // await AssessmentController.generateMetaCache(
  //   {
  //     assessment,
  //     cycle,
  //   },
  //   client
  // )

  // todo run calculations
}

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra', metaCache: true }, client)

  await Promise.all(assessment.cycles.map((cycle) => _updateCalculationFn({ assessment, cycle }, client)))
}

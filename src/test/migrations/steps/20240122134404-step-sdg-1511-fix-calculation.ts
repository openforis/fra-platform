import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { Col } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import { updateDependencies } from 'test/migrations/steps/utils/updateDependencies'

const _years = [2020, 2021, 2022, 2023, 2024, 2025]
const _getCalcFormula = (year: string) => {
  const eofString = _years.map((y) => `extentOfForest.forestArea['${y}']`).join(', ')
  const tlaString = _years.map((y) => `extentOfForest.totalLandArea['${y}']`).join(', ')

  return `calculatorForestAreaAsProportionOfTotalLandArea(${year}, [${eofString}], [${tlaString}])`
}

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025', metaCache: true },
    client
  )

  const schemaName = Schemas.getName(assessment)

  const nodeMetadata = await client.map(
    `
      select c.*
      from  ${schemaName}.table t
                left join ${schemaName}.row r on t.id = r.table_id
                left join ${schemaName}.col c on r.id = c.row_id
      where
          t.props ->> 'name' = 'sustainableDevelopment15_1_1'
        and r.props ->> 'variableName' = 'forestAreaProportionLandArea2015'
        and c.props ->> 'colName' in ('2020', '2021', '2022', '2023', '2024')
        `,
    [],
    (column) => {
      // eslint-disable-next-line no-param-reassign
      column.props.calculateFn[cycle.uuid] = _getCalcFormula(column.props.colName)
      return column
    }
  )

  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet<Col>(
    [
      {
        name: 'props',
        cast: 'jsonb',
      },
      {
        name: 'id',
        cast: 'bigint',
        cnd: true,
      },
    ],
    {
      table: { table: 'col', schema: schemaName },
    }
  )

  const query = `${pgp.helpers.update(nodeMetadata, cs)} WHERE v.id = t.id;`
  await client.query(query)

  // **** update metacache
  await AssessmentController.generateMetaCache(client)

  // **** update metadata cache
  await AssessmentController.generateMetadataCache({ assessment }, client)

  const update = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025', metaCache: true },
    client
  )

  // **** update calculated cols
  const nodes = await client.map<NodeUpdate>(
    `select s.props ->> 'name'         as section_name
          , t.props ->> 'name'         as table_name
          , r.props ->> 'variableName' as variable_name
          , c.props ->> 'colName'      as col_name
     from ${schemaName}.col c
              left join ${schemaName}.row r on r.id = c.row_id
              left join ${schemaName}."table" t on t.id = r.table_id
              left join ${schemaName}.table_section ts on ts.id = t.table_section_id
              left join ${schemaName}.section s on s.id = ts.section_id
     where s.props ->> 'name' = 'sustainableDevelopment'
       and t.props ->> 'name' = 'sustainableDevelopment15_1_1'
       and r.props ->> 'variableName' = 'forestAreaProportionLandArea2015'
       and c.props ->> 'colName' in ('2020', '2021', '2022', '2023', '2024')`,
    [],
    (res) => Objects.camelize(res)
  )

  await updateDependencies(
    { assessment: update.assessment, cycle: update.cycle, nodes, includeSourceNodes: true },
    client
  )
}

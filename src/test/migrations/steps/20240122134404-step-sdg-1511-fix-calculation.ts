import * as pgPromise from 'pg-promise'

import { Col } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import { updateCalculatedVariable } from 'test/migrations/steps/utils/updateCalculatedVariable'

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

  // Update cache
  await AssessmentController.generateMetaCache(client)
  await AssessmentController.generateMetadataCache({ assessment }, client)

  // Update calculated variables
  const sectionName = 'sustainableDevelopment'
  const tableName = 'sustainableDevelopment15_1_1'
  const variableName = 'forestAreaProportionLandArea2015'
  const updateCalculatedVariableProps = { assessment, cycle, sectionName, tableName, variableName }
  await updateCalculatedVariable(updateCalculatedVariableProps, client)
}

import { Objects } from '@core/utils'
import { calculateRow } from '@test/dataMigration/steps/updateCalculatedNodes/calculateRow'
import { getCertifiedAreaValues } from '@test/dataMigration/steps/updateCalculatedNodes/getCertifiedAreaValues'
import { getClimaticDomainValues } from '@test/dataMigration/steps/updateCalculatedNodes/getClimaticDomainValues'
import { getTotalLandAreaValues } from '@test/dataMigration/steps/updateCalculatedNodes/getTotalLandAreaValues'
import * as pgPromise from 'pg-promise'

import { Assessment, Col, Cycle, Row, VariableCache } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { BaseProtocol, Schemas } from '@server/db'

export const updateCalculatedNodes = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol
): Promise<void> => {
  const { assessment, cycle } = props

  const schema = Schemas.getName(assessment)

  const rows = await client.map<Row & { tableName: string; cols: Array<Col> }>(
    `
            select r.*,
                   t.props ->> 'name' as table_name,
                   jsonb_agg(c.*)     as cols
            from ${schema}.row r
                     left join ${schema}."table" t
                               on r.table_id = t.id
                     left join ${schema}.col c on r.id = c.row_id
            where r.props ->> 'calculateFn' is not null
               or c.props ->> 'calculateFn' is not null
            group by r.id, r.uuid, r.props, t.props ->> 'name'`,
    [],
    // @ts-ignore
    Objects.camelize
  )

  const variablesToCalculate = rows.map<VariableCache>((row) => ({
    tableName: row.tableName,
    variableName: row.props.variableName,
  }))
  const calculatedVariables: Record<string, Record<string, boolean>> = {}
  const countries = await AssessmentController.getCountries({ assessment, cycle }, client)
  const countryISOs = countries.map((c) => c.countryIso)

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(
    [
      'country_iso',
      'row_uuid',
      'col_uuid',
      {
        name: 'value',
        cast: 'jsonb',
      },
    ],
    {
      table: { table: 'node', schema: schemaCycle },
    }
  )

  // ===== total land area (fao stat)
  const totalLandAreaValues = await getTotalLandAreaValues(client)
  await client.query(pgp.helpers.insert(totalLandAreaValues, cs))

  // ===== certified area  - SDG sub ind. 5
  const certifiedAreaValues = await getCertifiedAreaValues(client)
  await client.query(pgp.helpers.insert(certifiedAreaValues, cs))

  const climaticDomainValues = await getClimaticDomainValues(client)
  await client.query(pgp.helpers.insert(climaticDomainValues, cs))

  // ===== calculation rows
  for (let i = 0; i < rows.length; i += 1) {
    const { tableName, ...row } = rows[i]
    if (!['growingStockAvg', 'growingStockTotal'].includes(tableName)) {
      // eslint-disable-next-line no-await-in-loop
      const values = await calculateRow(
        { assessment, cycle, countryISOs, row, tableName, calculatedVariables, variablesToCalculate },
        client
      )
      const query = pgp.helpers.insert(values, cs)
      // eslint-disable-next-line no-await-in-loop
      await client.query(query)
      // console.log('INSERT DONE ', tableName, row.props.variableName)
    }
  }
}

import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { Assessment, AssessmentNames, Cycle, Row, VariableCache } from 'meta/assessment'

import { AreaController } from 'server/controller/area'
import { BaseProtocol, Schemas } from 'server/db'
import { ColAdapter } from 'server/repository/adapter'

import { calculateRow } from 'test/dataMigration/steps/updateCalculatedNodes/calculateRow'
import { getCertifiedAreaValues } from 'test/dataMigration/steps/updateCalculatedNodes/getCertifiedAreaValues'
import { getClimaticDomainValues } from 'test/dataMigration/steps/updateCalculatedNodes/getClimaticDomainValues'
import { getTotalLandAreaValues } from 'test/dataMigration/steps/updateCalculatedNodes/getTotalLandAreaValues'

export const updateCalculatedNodes = async (props: { assessment: Assessment; cycle: Cycle }, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = props

  const schema = Schemas.getName(assessment)

  const rows = await client.map<Row & { tableName: string }>(
    `
        select r.*,
               t.props ->> 'name' as table_name,
               jsonb_agg(c.*) filter (where c.props -> 'cycles' ? '${cycle.uuid}')     as cols
        from ${schema}.row r
                 left join ${schema}."table" t on r.table_id = t.id
                 left join ${schema}.col c on r.id = c.row_id
        where t.props -> 'cycles' ? '${cycle.uuid}'
          and r.props -> 'cycles' ? '${cycle.uuid}'
          and c.props -> 'cycles' ? '${cycle.uuid}'
          and (
              (r.props ->> 'calculateFn' is not null and r.props -> 'calculateFn' ->> '${cycle.uuid}' is not null) 
                  or
              (c.props ->> 'calculateFn' is not null and c.props -> 'calculateFn' ->> '${cycle.uuid}' is not null)
              )
        group by r.id, r.uuid, r.props, t.props ->> 'name'
        order by r.id`,
    [],
    (row) => {
      return {
        ...Objects.camelize(row),
        cols: row.cols.map(ColAdapter),
        props: {
          ...Objects.camelize(row.props),
          calculateFn: row.props.calculateFn,
          linkToSection: row.props.linkToSection,
          validateFns: row.props.validateFns,
          chart: row.props.chart,
        },
      }
    }
  )

  const variablesToCalculate = rows.map<VariableCache>((row) => ({
    tableName: row.tableName,
    variableName: row.props.variableName,
  }))
  const calculatedVariables: Record<string, Record<string, boolean>> = {}
  const countries = await AreaController.getCountries({ assessment, cycle }, client)
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

  if (assessment.props.name === AssessmentNames.fra) {
    // ===== total land area (fao stat)
    const totalLandAreaValues = await getTotalLandAreaValues({ cycle }, client)
    await client.query(pgp.helpers.insert(totalLandAreaValues, cs))

    // ===== certified area  - SDG sub ind. 5
    const certifiedAreaValues = await getCertifiedAreaValues({ cycle }, client)
    await client.query(pgp.helpers.insert(certifiedAreaValues, cs))

    const climaticDomainValues = await getClimaticDomainValues({ cycle }, client)
    await client.query(pgp.helpers.insert(climaticDomainValues, cs))
  }

  // ===== calculation rows
  for (let i = 0; i < rows.length; i += 1) {
    const { tableName, ...row } = rows[i]
    if (!['growingStockAvg', 'growingStockTotal', 'biomassStockAvg', 'carbonStockAvg'].includes(tableName)) {
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

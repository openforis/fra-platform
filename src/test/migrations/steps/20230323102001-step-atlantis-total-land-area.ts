import * as pgPromise from 'pg-promise'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => i + 1950)
  const countryIsos = Array.from({ length: 20 }, (_, i) => `X${i < 9 ? '0' : ''}${i + 1}`)

  const tableName = 'extentOfForest'
  const variableName = 'totalLandArea'

  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    {
      assessmentName: 'fra',
      metaCache: true,
      cycleName: '2025',
    },
    client
  )

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const pgp = pgPromise()

  const cs = new pgp.helpers.ColumnSet(
    [
      'country_iso',
      'table_name',
      'variable_name',
      'col_name',
      {
        name: 'value',
        cast: 'jsonb',
      },
    ],
    {
      table: { table: 'node_ext', schema: schemaCycle },
    }
  )

  const value = '4412.0'

  const values = years.flatMap((year) => {
    return countryIsos.flatMap((countryIso) => {
      return {
        country_iso: countryIso,
        table_name: tableName,
        variable_name: variableName,
        col_name: year,
        value: { raw: value },
      }
    })
  })

  await client.query(pgp.helpers.insert(values, cs))
}

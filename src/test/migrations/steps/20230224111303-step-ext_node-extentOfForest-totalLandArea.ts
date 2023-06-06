import * as pgPromise from 'pg-promise'

import { BaseProtocol } from 'server/db'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const values = require('./data/totalLandAreas_1950-2020.json')

export default async (client: BaseProtocol) => {
  const schemaCycle = 'assessment_fra_2025'
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
  // Delete previous nodes before 2020
  await client.query(
    `delete from ${schemaCycle}.node_ext where table_name = 'extentOfForest' and  variable_name = 'totalLandArea' and col_name::numeric <= 2020`
  )
  await client.query(pgp.helpers.insert(values, cs))
}

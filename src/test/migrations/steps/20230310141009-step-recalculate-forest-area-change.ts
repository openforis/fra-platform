import * as pgPromise from 'pg-promise'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import { getRow } from 'test/migrations/steps/utils/getRow'

import { calculateRow } from './utils/calculateRow'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    {
      assessmentName: 'fra',
      metaCache: true,
      cycleName: '2025',
    },
    client
  )

  const variableName = 'forestAreaNetChangeFrom1a'
  const tableName = 'forestAreaChange'

  const row = await getRow({ tableName, variableName, cycle, assessment }, client)

  const calculatedVariables: Record<string, Record<string, boolean>> = {}
  const countries = await AreaController.getCountries({ assessment, cycle }, client)
  const countryISOs = countries.map((c) => c.countryIso)

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(
    [
      'country_iso',
      {
        name: 'row_uuid',
        cast: 'uuid',
      },
      {
        name: 'col_uuid',
        cast: 'uuid',
      },
      {
        name: 'value',
        cast: 'jsonb',
      },
    ],
    {
      table: { table: 'node', schema: schemaCycle },
    }
  )

  // ===== calculation rows
  const values = await calculateRow({ assessment, cycle, countryISOs, row, tableName, calculatedVariables }, client)
  const query = `${pgp.helpers.insert(
    values,
    cs
  )} on conflict ("country_iso", "row_uuid", "col_uuid") do update set "value" = excluded."value"`
  await client.query(query)
}

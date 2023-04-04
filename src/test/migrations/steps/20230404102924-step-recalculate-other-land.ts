import * as pgPromise from 'pg-promise'

import { AreaController } from '@server/controller/area'
import { AssessmentController } from '@server/controller/assessment'
import { BaseProtocol, Schemas } from '@server/db'

import { getRows } from '@test/migrations/steps/utils/getRow'

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

  const variableName = 'otherLand'
  const tableName = 'extentOfForest'

  const rows = await getRows({ tableName, variableName, cycle, assessment }, client)

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
  for (let i = 0; i < rows.length; i += 1) {
    const { tableName, ...row } = rows[i]
    // eslint-disable-next-line no-await-in-loop
    const values = await calculateRow({ assessment, cycle, countryISOs, row, tableName, calculatedVariables }, client)
    const query = `${pgp.helpers.insert(
      values,
      cs
    )} on conflict ("country_iso", "row_uuid", "col_uuid") do update set "value" = excluded."value"`
    // eslint-disable-next-line no-await-in-loop
    await client.query(query)
  }
}

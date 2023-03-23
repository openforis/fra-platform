import * as pgPromise from 'pg-promise'

import { AssessmentController } from '@server/controller/assessment'
import { BaseProtocol, Schemas } from '@server/db'

export default async (client: BaseProtocol) => {
  const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => i + 1950)

  // Random values picked from the original data
  const totalLandAreaValues = {
    X01: '11276',
    X02: '112859.9766',
    X03: '1217',
    X04: '13996',
    X05: '13996',
    X06: '1827',
    X07: '18378',
    X08: '2805',
    X09: '30459',
    X10: '4239',
    X11: '4831',
    X12: '51089',
    X13: '5439',
    X14: '5439',
    X15: '5596.43',
    X16: '7102',
    X17: '7727',
    X18: '924',
    X19: '952.3',
    X20: '66991',
  }
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

  const values = years.flatMap((year) => {
    return Object.entries(totalLandAreaValues).flatMap(([countryIso, value]) => {
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

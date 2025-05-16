import * as pgPromise from 'pg-promise'
import { UUIDs } from 'utils/uuids'

import { Unit } from 'meta/measurement/unit'

import { BaseProtocol, DB } from 'server/db'
import { DDL } from 'server/repository/public/ddl'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

export default async () => {
  // 0. Avoid re-running
  const { exists } = await client.one<{ exists: boolean }>(
    `select exists(select 1 from information_schema.schemata where schema_name = 'measurement') as exists;`
  )
  if (exists) {
    Logger.info('Measurement schema already initialized')
    return
  }

  // 1. Create measurement schema and tables
  await client.query(DDL.getCreateMeasurementSchemaDDL())

  // 2. Insert area based units
  const pgp = pgPromise()
  const haThousand: Unit = { name: 'haThousand', symbol: '1000 ha', uuid: UUIDs.v4() }
  const ha: Unit = { name: 'ha', symbol: 'ha', uuid: UUIDs.v4() }
  const kmSq: Unit = { name: 'kmSq', symbol: 'km²', uuid: UUIDs.v4() }
  const mileSq: Unit = { name: 'mileSq', symbol: 'mi²', uuid: UUIDs.v4() }
  const acre1000: Unit = { name: 'acre1000', symbol: '1000 ac', uuid: UUIDs.v4() }
  const acre: Unit = { name: 'acre', symbol: 'ac', uuid: UUIDs.v4() }
  const haMillion: Unit = { name: 'haMillion', symbol: '1000000 ha', uuid: UUIDs.v4() }

  const units = [haThousand, ha, kmSq, mileSq, acre1000, acre, haMillion]

  const unitColumns = [
    { name: 'uuid', prop: 'uuid' },
    { name: 'name', prop: 'name' },
    { name: 'symbol', prop: 'symbol' },
  ]
  const unitCS = new pgp.helpers.ColumnSet(unitColumns, { table: { table: 'unit', schema: 'measurement' } })
  const insertUnitsQuery = pgp.helpers.insert(units, unitCS)
  await client.none(insertUnitsQuery)

  // 2. Insert area system of measurement
  const baseUnitUuid = haThousand.uuid
  const conversionFactors = JSON.stringify({
    [baseUnitUuid]: 1,
    [ha.uuid]: 1000,
    [kmSq.uuid]: 10,
    [mileSq.uuid]: 3.86102,
    [acre1000.uuid]: 2.47105,
    [acre.uuid]: 2471.05,
    [haMillion.uuid]: 0.001,
  })

  await client.query(
    `
    insert into measurement.system_of_measurement (
      name,
      conversion_factors,
      base_unit_uuid
    ) values ($1, $2::jsonb, $3);
    `,
    ['area', conversionFactors, baseUnitUuid]
  )

  Logger.info('Measurement schema initialized')
}

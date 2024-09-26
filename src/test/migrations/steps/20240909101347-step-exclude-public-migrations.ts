import * as pgPromise from 'pg-promise'
import { tableMigrationsPublicDDL } from 'tools/migrations/public/tableMigrationsPublicDDL'

import { BaseProtocol, DB } from 'server/db'

// List of migrations that should be excluded from the existing instances
const values = [
  { name: '20240905123935-step-init-public-schema.ts' },
  { name: '20240910115926-step-init-settings.ts' },
  { name: '20240910120417-step-init-country.ts' },
]

const client: BaseProtocol = DB

export default async () => {
  const pgp = pgPromise()
  // DROP CONTENT
  await client.query(`
    drop table if exists public.migrations;
  `)

  // INIT TABLE
  await client.query(tableMigrationsPublicDDL)

  // INSERT
  const cs = new pgp.helpers.ColumnSet(['name'], {
    table: { table: 'public', schema: 'migrations' },
  })

  const query = `${pgp.helpers.insert(values, cs)} on conflict do nothing;`

  await client.none(query)
}

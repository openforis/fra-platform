import * as pgPromise from 'pg-promise'

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
    truncate table public.migrations;
  `)

  // UPDATE DDL
  await client.query(`
    alter table migrations
    alter column run_on set default now(),
    alter column run_on type timestamp without time zone
  `)

  // INSERT
  const cs = new pgp.helpers.ColumnSet(['name'], {
    table: { table: 'migrations', schema: 'public' },
  })

  const query = `${pgp.helpers.insert(values, cs)}`

  await client.none(query)
}

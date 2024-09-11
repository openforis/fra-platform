import * as pgPromise from 'pg-promise'

import { BaseProtocol } from 'server/db'

const values = [
  { name: '20240905123935-step-init-public-schema', run_on: new Date() },
  { name: '20240906093649-step-init-admin-user', run_on: new Date() },
]

export default async (client: BaseProtocol) => {
  const pgp = pgPromise()

  const cs = new pgp.helpers.ColumnSet(['name', 'run_on'], {
    table: { table: 'migrations', schema: 'public' },
  })

  const query = `${pgp.helpers.insert(values, cs)}`

  await client.none(query)
}

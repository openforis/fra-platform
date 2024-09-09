import * as pgPromise from 'pg-promise'

import { BaseProtocol } from 'server/db'

const values = [{ name: '20240905123935-step-init-public-schema' }, { name: '20240906093649-step-init-admin-user' }]

export default async (client: BaseProtocol) => {
  const pgp = pgPromise()

  const cs = new pgp.helpers.ColumnSet(['name'], {
    table: { table: 'migrations', schema: 'public' },
  })

  const query = `${pgp.helpers.insert(values, cs)} ON CONFLICT (name) DO NOTHING`

  await client.none(query)
}

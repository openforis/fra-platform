import * as pgPromise from 'pg-promise'

import { DB } from 'server/db'

export default async () => {
  const pgp = pgPromise()

  const n = (i: number) => i.toString().padStart(2, '0')
  const countries = Array.from({ length: 20 }, (_, i) => ({ country_iso: `X${n(i)}`, config: { domain: 'tropical' } }))

  const cs = new pgp.helpers.ColumnSet(['country_iso', 'config'], { table: 'country' })
  const query = `${pgp.helpers.insert(countries, cs)} ON CONFLICT (country_iso) DO NOTHING`

  await DB.none(query)
}

import * as pgPromise from 'pg-promise'

import { DB } from 'server/db'

import { countries } from './data/countries'

export default async () => {
  const pgp = pgPromise()

  const cs = new pgp.helpers.ColumnSet(['country_iso', 'config'], { table: 'country' })
  const query = `${pgp.helpers.insert(countries, cs)} ON CONFLICT (country_iso) DO NOTHING`

  await DB.none(query)
}

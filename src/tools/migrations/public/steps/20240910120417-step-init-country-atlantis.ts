import * as pgPromise from 'pg-promise'

import { DB } from 'server/db'

export default async () => {
  const pgp = pgPromise()

  const countries = [
    { country_iso: 'X01', config: { domain: 'tropical' } },
    { country_iso: 'X02', config: { domain: 'tropical' } },
    { country_iso: 'X03', config: { domain: 'tropical' } },
    { country_iso: 'X04', config: { domain: 'tropical' } },
    { country_iso: 'X05', config: { domain: 'tropical' } },
    { country_iso: 'X06', config: { domain: 'tropical' } },
    { country_iso: 'X07', config: { domain: 'tropical' } },
    { country_iso: 'X08', config: { domain: 'tropical' } },
    { country_iso: 'X09', config: { domain: 'tropical' } },
    { country_iso: 'X10', config: { domain: 'tropical' } },
    { country_iso: 'X11', config: { domain: 'tropical' } },
    { country_iso: 'X12', config: { domain: 'tropical' } },
    { country_iso: 'X13', config: { domain: 'tropical' } },
    { country_iso: 'X14', config: { domain: 'tropical' } },
    { country_iso: 'X15', config: { domain: 'tropical' } },
    { country_iso: 'X16', config: { domain: 'tropical' } },
    { country_iso: 'X17', config: { domain: 'tropical' } },
    { country_iso: 'X18', config: { domain: 'tropical' } },
    { country_iso: 'X19', config: { domain: 'tropical' } },
    { country_iso: 'X20', config: { domain: 'tropical' } },
  ]

  const cs = new pgp.helpers.ColumnSet(['country_iso', 'config'], { table: 'country' })
  const query = `${pgp.helpers.insert(countries, cs)} ON CONFLICT (country_iso) DO NOTHING`

  await DB.none(query)
}

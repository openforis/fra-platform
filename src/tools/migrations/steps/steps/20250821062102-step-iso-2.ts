import * as fs from 'fs'
import * as path from 'path'
import * as pgPromise from 'pg-promise'
import { Promises } from 'utils/promises'

import { BaseProtocol } from 'server/db'

const getISOMap = (): Record<string, string> => {
  const csvPath = path.join(__dirname, 'data', 'iso3-iso2.csv')
  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const lines = csvContent.split('\n').slice(1)

  const map: Record<string, string> = {}
  lines.forEach((line) => {
    if (line.trim()) {
      const columns = line.split(',')
      const iso3 = columns[0]
      const iso2 = columns[1]
      map[iso3] = iso2
    }
  })

  return map
}

export default async (client: BaseProtocol): Promise<void> => {
  const iso3ToIso2 = getISOMap()
  const countryISOs = await client.map(`select country_iso from public.country`, [], (row) => row.country_iso)

  await client.none(`alter table public.country add column if not exists country_iso_2 varchar(2)`)

  const pgp = pgPromise()

  await Promises.each(countryISOs, async (countryIso) => {
    const iso2 = iso3ToIso2[countryIso]

    const cs = new pgp.helpers.ColumnSet(['country_iso_2'], { table: { table: 'country', schema: 'public' } })
    const query = `${pgp.helpers.update({ country_iso_2: iso2 }, cs)} where country_iso = $1`
    await client.none(query, [countryIso])
  })
}

import { BaseProtocol, DB } from '@server/db'
import { ODP } from '@core/odp'
import { CountryIso } from '@core/country'
import { getOdp } from './getOdp'

export const listOriginalDataPoints = async (
  options: { countryIso: CountryIso; schemaName?: string },
  client: BaseProtocol = DB
) => {
  const { countryIso, schemaName = 'public' } = options

  const tableName = `${schemaName}.odp`
  const res = await client.query(
    `
    SELECT p.id as odp_id
    FROM ${tableName} p
    WHERE country_iso = $1
  `,
    [countryIso]
  )

  console.log(res.rows)

  const odps = await Promise.all(res.rows.map((r: any) => getOdp(r.odp_id, schemaName)))
  return [...odps].sort((odp1: ODP, odp2: ODP) => +odp1.year - +odp2.year)
}

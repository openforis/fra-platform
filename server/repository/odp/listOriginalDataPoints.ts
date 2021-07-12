import * as db from '@server/db/db_deprecated'

import { getOdp } from './getOdp'

export const listOriginalDataPoints = async (countryIso: any, schemaName = 'public') => {
  const tableName = `${schemaName}.odp`
  const res = await db.pool.query(
    `
    SELECT p.id as odp_id
    FROM ${tableName} p
    WHERE country_iso = $1
  `,
    [countryIso]
  )
  const odps = await Promise.all(res.rows.map((r: any) => getOdp(r.odp_id, schemaName)))
  return [...odps].sort((odp1, odp2) => odp1.year - odp2.year)
}

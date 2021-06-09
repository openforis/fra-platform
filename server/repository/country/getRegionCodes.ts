// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as camelize from 'camelize'
// Get all region codes
import * as db from '@server/db/db'

export const getRegionCodes = async () => {
  const query = `select distinct region_code from country_region`

  const result = await db.pool.query(query)
  return camelize(result.rows).map((region: any) => region.regionCode)
}

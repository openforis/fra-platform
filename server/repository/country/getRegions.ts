// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import camelize from 'camelize'
import * as db from '@server/db/db_deprecated'

export const getRegions = async () => {
  // Exclude Atlantis from regions
  const query = `SELECT region_code, name, region_group FROM region WHERE region_code != 'AT'`
  const result = await db.pool.query(query)
  return camelize(result.rows)
}

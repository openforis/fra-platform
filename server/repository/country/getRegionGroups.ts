// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as camelize from 'camelize'
import * as db from '@server/db/db'

export const getRegionGroups = async () => {
  // Exclude Atlantis from region groups
  const query = `
        SELECT * FROM region_group ORDER BY "order"
        `
  const result = await db.pool.query(query)
  return camelize(result.rows)
}

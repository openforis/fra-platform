// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as camelize from 'camelize'
// Get all countryIsos, or countryIsos for certain region
import * as db from '@server/db/db_deprecated'

export const getCountryIsos = async (regionCode?: any) => {
  const query = `select country_iso
                 from country_region ${regionCode ? `where region_code = '${regionCode}' ` : ''}`

  const result = await db.pool.query(query)
  return camelize(result.rows).map((region: any) => region.countryIso)
}

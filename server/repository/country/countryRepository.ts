// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as camelize from 'camelize'
import { getCountryProperties } from './getCountryProperties'
import * as db from '../../db/db'

export const saveDynamicConfigurationVariable = async (client: any, countryIso: any, key: any, value: any) => {
  const configResult = await client.query('SELECT config FROM dynamic_country_configuration WHERE country_iso = $1', [
    countryIso,
  ])
  if (configResult.rows.length > 0) {
    await client.query(
      `UPDATE dynamic_country_configuration
         SET config = $1
         WHERE country_iso = $2`,
      [{ ...configResult.rows[0].config, [key]: value }, countryIso]
    )
  } else {
    await client.query(
      `INSERT INTO dynamic_country_configuration
             (country_iso, config)
         VALUES ($1, $2)`,
      [countryIso, { [key]: value }]
    )
  }
}

export const getCountry = (countryIso: any) =>
  db.pool
    .query(
      `
    SELECT c.country_iso,
     json_agg(cr.region_code) AS region_codes
FROM country c
JOIN country_region cr
USING (country_iso)
WHERE C.country_iso = $1
GROUP BY c.country_iso

`,
      [countryIso]
    )
    .then((res: any) => getCountryProperties(camelize(res.rows[0])))

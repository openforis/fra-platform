// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import camelize from 'camelize'

import * as db from '@server/db/db_deprecated'
import { getCountryProperties } from '@server/repository/country/getCountryProperties'

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

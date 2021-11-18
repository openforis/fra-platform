// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as camelize from 'camelize'
import * as db from '@server/db/db_deprecated'

export const getAllCountriesList = async () => {
  const rs = await db.pool.query(`
WITH assessment AS (
    SELECT a.country_iso,
           json_object_agg(a.type::TEXT,
                           json_build_object('desk_study', a.desk_study, 'status', a.status)) AS assessment
    FROM assessment a
    GROUP BY a.country_iso
)
SELECT c.country_iso,
       a.assessment::TEXT::jsonb,
       json_agg(cr.region_code) AS region_codes
FROM country c
JOIN country_region cr
USING (country_iso)
LEFT JOIN assessment a
USING (country_iso)
GROUP BY c.country_iso, a.assessment::TEXT::jsonb
ORDER BY c.country_iso
  `)
  return camelize(rs.rows)
}

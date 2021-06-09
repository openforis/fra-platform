import * as db from '@server/db/db'
import { handleCountryResult } from './handleCountryResult'

export const getAllCountries = (role: any, schemaName = 'public') => {
  const excludedMsgs = ['createIssue', 'createComment', 'deleteComment']
  const tableNameFraAudit = `${schemaName}.fra_audit`
  const tableNameCountry = `${schemaName}.country`
  const tableNameCountryRegion = `${schemaName}.country_region`
  const tableNameAssessment = `${schemaName}.assessment`

  const query = `
WITH fa AS (
    SELECT country_iso, to_char(max(time), 'YYYY-MM-DD"T"HH24:MI:ssZ') AS last_edited
    FROM ${tableNameFraAudit}
    WHERE NOT (message IN ($1))
    GROUP BY country_iso
)
SELECT c.country_iso,
       a.type,
       a.status,
       a.desk_study,
       fa.last_edited,
       json_agg(cr.region_code) AS region_codes
FROM ${tableNameCountry} c
JOIN ${tableNameCountryRegion} cr
USING (country_iso)
LEFT OUTER JOIN
${tableNameAssessment} a
USING (country_iso)
LEFT OUTER JOIN
fa
USING (country_iso)
GROUP BY c.country_iso, a.type, a.type, a.status, a.desk_study, fa.last_edited
`
  return db.pool.query(query, [excludedMsgs]).then(handleCountryResult(() => role))
}

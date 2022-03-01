import * as R from 'ramda'
import * as CountryRole from '@common/countryRole'
import * as db from '@server/db/db_deprecated'
import { Objects } from '@core/utils'
import { getAllCountries } from './getAllCountries'
import { handleCountryResult } from './handleCountryResult'

export const determineRole = (roles: any) => (countryIso: any) =>
  // @ts-ignore
  R.pipe(R.filter(R.propEq('countryIso', countryIso)), R.head, R.prop('role'))(roles)

export const getAllowedCountries = (roles: any, schemaName = 'public') => {
  const isAdmin = R.find(R.propEq('role', CountryRole.administrator.role), roles)
  if (Objects.isEmpty(roles)) {
    return getAllCountries(CountryRole.noRole.role, schemaName)
  }
  if (isAdmin) {
    return getAllCountries(CountryRole.administrator.role)
  }

  const excludedMsgs = ['createIssue', 'createComment', 'deleteComment']
  const allowedCountryIsos = R.pipe(R.map(R.prop('countryIso')), R.reject(R.isNil))(roles)
  const allowedIsoQueryPlaceholders = R.range(2, allowedCountryIsos.length + 2)
    .map((i: any) => `$${i}`)
    .join(',')

  return db.pool
    .query(
      `
      WITH fa AS (
        SELECT country_iso, to_char(max(time), 'YYYY-MM-DD"T"HH24:MI:ssZ') as last_edited
        FROM fra_audit
        WHERE country_iso in (${allowedIsoQueryPlaceholders})
        AND NOT (message in ($1))
        GROUP BY country_iso
      )
       SELECT c.country_iso,
       a.type,
       a.status,
       a.desk_study,
       fa.last_edited,
       json_agg(cr.region_code) AS region_codes
      FROM
        country c
      JOIN country_region cr
      USING (country_iso)
      LEFT OUTER JOIN
        assessment a ON c.country_iso = a.country_iso
      LEFT OUTER JOIN
        fa ON fa.country_iso = c.country_iso
      WHERE c.country_iso in (${allowedIsoQueryPlaceholders})
      GROUP BY c.country_iso, a.type, a.type, a.status, a.desk_study, fa.last_edited`,
      // @ts-ignore
      [excludedMsgs, ...allowedCountryIsos]
    )
    .then(handleCountryResult(determineRole(roles)))
}

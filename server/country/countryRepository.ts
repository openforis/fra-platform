// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'camelize'.
const camelize = require('camelize')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')

const CountryRole = require('../../common/countryRole')

/*
 * Determine the "overall status" from multiple statuses.
 * For example, one review is enough to determine that overall
 * the whole country is in review.
 * If all statuses are in accepted, we determine that country is in
 * accepted status.
 */
const determineCountryAssessmentStatus = (type: any, statuses: any) =>
  R.pipe(
    R.filter(R.propEq('type', type)),
    R.head,
    R.defaultTo({ status: 'editing' }), // Initially, there are no rows for country's assessment,
    // this is also considered to be 'editing' status
    R.prop('status')
  )(statuses)

const determineRole = (roles: any) => (countryIso: any) =>
  R.pipe(R.filter(R.propEq('countryIso', countryIso)), R.head, R.prop('role'))(roles)

const getStatuses = (groupedRows: any) => R.pipe(R.map(R.pick(['type', 'status'])), R.filter(R.identity))(groupedRows)

const getCountryProperties = (country: any) => ({
  countryIso: country.countryIso,
  regionCodes: country.regionCodes,
  lastEdit: country.lastEdited,
})

const handleCountryResult = (resolveRole: any) => (result: any) => {
  const grouped = R.groupBy((row: any) => row.countryIso, camelize(result.rows))
  return R.pipe(
    R.toPairs,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'countryIso' implicitly has an 'an... Remove this comment to see the full error message
    R.map(([countryIso, vals]) => {
      return {
        ...getCountryProperties(vals[0]),
        annualAssessment: determineCountryAssessmentStatus('annuallyUpdated', getStatuses(vals)),
        fra2020Assessment: determineCountryAssessmentStatus('fra2020', getStatuses(vals)),
        fra2020DeskStudy: R.pipe(
          R.find(R.propEq('type', 'fra2020')),
          R.propOr(false, 'deskStudy'),
          R.equals(true)
        )(vals),
        role: resolveRole(countryIso),
      }
    }),
    R.groupBy(R.prop('role'))
  )(grouped)
}

const getAllCountries = (role: any, schemaName = 'public') => {
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
  return db.query(query, [excludedMsgs]).then(handleCountryResult(() => role))
}

const getAllCountriesList = async () => {
  const rs = await db.query(`
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

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getRegions... Remove this comment to see the full error message
const getRegions = async () => {
  // Exclude Atlantis from regions
  const query = `SELECT region_code, name, region_group FROM region WHERE region_code != 'AT'`
  const result = await db.query(query)
  return camelize(result.rows)
}

const getRegionGroups = async () => {
  // Exclude Atlantis from region groups
  const query = `
        SELECT * FROM region_group
        `
  const result = await db.query(query)
  return camelize(result.rows)
}

// Get all countryIsos, or countryIsos for certain region
const getCountryIsos = async (regionCode: any) => {
  const query = `select country_iso from country_region ${regionCode ? `where region_code = '${regionCode}' ` : ''}`

  const result = await db.query(query)
  return camelize(result.rows).map((region: any) => region.countryIso)
}

// Get all region codes
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getRegionC... Remove this comment to see the full error message
const getRegionCodes = async () => {
  const query = `select distinct region_code from country_region`

  const result = await db.query(query)
  return camelize(result.rows).map((region: any) => region.regionCode)
}

const getAllowedCountries = (roles: any, schemaName = 'public') => {
  const isAdmin = R.find(R.propEq('role', CountryRole.administrator.role), roles)
  if (R.isEmpty(roles)) {
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
  return db
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
      [excludedMsgs, ...allowedCountryIsos]
    )
    .then(handleCountryResult(determineRole(roles)))
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getDynamic... Remove this comment to see the full error message
const getDynamicCountryConfiguration = async (countryIso: any, schemaName = 'public') => {
  const tableName = `${schemaName}.dynamic_country_configuration`
  const result = await db.query(
    `
              SELECT config
              FROM ${tableName}
              WHERE country_iso = $1
    `,
    [countryIso]
  )
  if (result.rows.length === 0) return {}
  return result.rows[0].config
}

const saveDynamicConfigurationVariable = async (client: any, countryIso: any, key: any, value: any) => {
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

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCountry... Remove this comment to see the full error message
const getCountry = (countryIso: any) =>
  db
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

module.exports.getAllowedCountries = getAllowedCountries
module.exports.getAllCountriesList = getAllCountriesList
module.exports.getRegions = getRegions
module.exports.getRegionCodes = getRegionCodes
module.exports.getDynamicCountryConfiguration = getDynamicCountryConfiguration
module.exports.saveDynamicConfigurationVariable = saveDynamicConfigurationVariable
module.exports.getFirstAllowedCountry = (roles: any) =>
  getAllowedCountries(roles).then((result: any) => R.pipe(R.values, R.head, R.head)(result))
module.exports.getCountry = getCountry
module.exports.getCountryIsos = getCountryIsos
module.exports.getRegionGroups = getRegionGroups

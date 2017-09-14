const R = require('ramda')
const db = require('../db/db')
const camelize = require('camelize')

/*
 * Determine the "overall status" from multiple statuses.
 * For example, one review is enough to determine that overall
 * the whole country is in review.
 * If all statuses are in accepted, we determine that country is in
 * accepted status.
 */
const determineCountryAssessmentStatus = (type, statuses) => R.pipe(
    R.filter(R.propEq('type', type)),
    R.head,
    R.defaultTo({status: 'editing'}), //Initially, there are no rows for country's assessment,
                                      //this is also considered to be 'editing' status
    R.prop('status')
  )(statuses)

const determineRole = roles => countryIso =>
  R.pipe(R.filter(R.propEq('countryIso', countryIso)), R.head, R.prop('role'))(roles)

const getStatuses = groupedRows =>
  R.pipe(
    R.map(R.pick(['type', 'status'])),
    R.filter(R.identity)
  )(groupedRows)

const handleCountryResult = resolveRole => result => {
  const grouped = R.groupBy(row => row.countryIso, camelize(result.rows))
  return R.pipe(
    R.toPairs,
    R.map(
      ([countryIso, vals]) => {
        return {
          countryIso,
          name: vals[0].name,
          annualAssesment: determineCountryAssessmentStatus('annuallyReported', getStatuses(vals)),
          fiveYearAssesment: determineCountryAssessmentStatus('fiveYearCycle', getStatuses(vals)),
          role: resolveRole(countryIso),
          lastEdit:  vals[0].lastEdited
        }
      }),
    R.groupBy(R.prop('role'))
  )(grouped)
}

const getAllCountries = role => {
  const excludedMsgs = ['createIssue', 'createComment', 'deleteComment']
  return db.query(`
       WITH fa AS (
       SELECT country_iso, to_char(max(time), 'YYYY-MM-DD"T"HH24:MI:ssZ') as last_edited
           FROM fra_audit
           WHERE NOT (message in ($1))
           GROUP BY country_iso
       ) 
       SELECT c.country_iso, c.name, a.type, a.status, fa.last_edited
            FROM country c
            LEFT OUTER JOIN assessment a ON c.country_iso = a.country_iso 
            LEFT OUTER JOIN fa on fa.country_iso = c.country_iso
            ORDER BY name ASC`, [excludedMsgs])
    .then(handleCountryResult(() => role))
}

const getAllowedCountries = roles => {
  const hasRole = (role) => R.find(R.propEq('role', role), roles)
  if (hasRole('REVIEWER_ALL')) {
    return getAllCountries('REVIEWER_ALL')
  }
  if(hasRole('NATIONAL_CORRESPONDENT_ALL')) {
    return getAllCountries('NATIONAL_CORRESPONDENT_ALL')
  } else {
    const excludedMsgs = ['createIssue', 'createComment', 'deleteComment']
    const allowedCountryIsos = R.pipe(R.map(R.prop('countryIso')), R.reject(R.isNil))(roles)
    const allowedIsoQueryPlaceholders = R.range(2, allowedCountryIsos.length + 2).map(i => '$' + i).join(',')
    return db.query(`
     WITH fa AS (
      SELECT country_iso, to_char(max(time), 'YYYY-MM-DD"T"HH24:MI:ssZ') as last_edited
         FROM fra_audit
         WHERE country_iso in (${allowedIsoQueryPlaceholders})
         AND NOT (message in ($1))
         GROUP BY country_iso
     ) 
    SELECT c.country_iso, c.name, a.type, a.status, fa.last_edited
                     FROM country c
                     LEFT OUTER JOIN assessment a ON c.country_iso = a.country_iso
                     LEFT OUTER JOIN fa
                       ON fa.country_iso = c.country_iso
                     WHERE c.country_iso in (${allowedIsoQueryPlaceholders})
                     ORDER BY name ASC`,
      [excludedMsgs, ...allowedCountryIsos])
      .then(handleCountryResult(determineRole(roles)))
  }
}

module.exports.getAllowedCountries = getAllowedCountries

module.exports.getFirstAllowedCountry = roles =>
  getAllowedCountries(roles).then(result => R.pipe(R.values, R.head, R.head)(result))

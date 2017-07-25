const R = require('ramda')
const db = require('../db/db')
const camelize = require('camelize')

/*
 * Determine the "overall status" from multiple statuses.
 * For example, one review is enough to determine that overall
 * the whlole country is in review
 * If all statuses are in accepted, we determine that country is in
 * accepted status
 */
const determineCountryAssessmentStatus = (statuses) => {
  if (R.isEmpty(statuses)) return 'editing' //Initially, there are no rows for country's assessment,
                                            //this is also considered to be 'editing' status
  else if (R.all(R.equals('accepted'), statuses)) return 'accepted'
  else if (R.any(R.equals('review'), statuses)) return 'review'
  else return 'editing'
}

const getStatuses = groupedRows =>
  R.pipe(
    R.map(R.prop('status')),
    R.filter(R.identity)
  )(groupedRows)

const handleCountryResult = result => {
  const grouped = R.groupBy(row => row.countryIso, camelize(result.rows))
  const withOverallAssessments = R.map(
    ([countryIso, vals]) => {
      return {
        countryIso,
        name: vals[0].name,
        assessmentStatus: determineCountryAssessmentStatus(getStatuses(vals))
      }
    },
    R.toPairs(grouped))
  console.log(withOverallAssessments)
  return withOverallAssessments
}

const getAllCountries = () => console.log('getAllCountries') ||
  db.query(`SELECT c.country_iso, c.name, a.status
            FROM country c
            LEFT OUTER JOIN assessment a ON c.country_iso = a.country_iso 
            ORDER BY name ASC`)
    .then(handleCountryResult)

module.exports.getAllowedCountries = (roles) => {
  const hasRole = (role) => R.find(R.propEq('role', role), roles)
  // Either of these give access to full country list
  if (hasRole('REVIEWER_ALL') || hasRole('NATIONAL_CORRESPONDENT_ALL')) {
    return getAllCountries()
  } else {
    const allowedCountryIsos = R.pipe(R.map(R.prop('countryIso')), R.reject(R.isNil))(roles)
    const allowedIsoQueryPlaceholders = R.range(1, allowedCountryIsos.length +1).map(i => '$'+i).join(',')
    return db.query(`SELECT c.country_iso, c.name, a.status 
                     FROM country c
                     LEFT OUTER JOIN assessment a ON c.country_iso = a.country_iso
                     WHERE c.country_iso in (${allowedIsoQueryPlaceholders})
                     ORDER BY name ASC`,
                    allowedCountryIsos)
      .then(handleCountryResult)
  }
}

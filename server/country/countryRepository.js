const R = require('ramda')
const db = require('../db/db')
const camelize = require('camelize')

const getAllCountries = () => db.query('SELECT country_iso, name FROM country ORDER BY name ASC').then(res => camelize(res))

module.exports.getAllCountries = getAllCountries

module.exports.getAllowedCountries = (roles) => {
  const hasRole = (role) => R.find(R.propEq('role', role), roles)
  // Either of these give access to full country list
  if (hasRole('REVIEWER_ALL') || hasRole('NATIONAL_CORRESPONDENT_ALL')) {
    return getAllCountries()
  } else {
    const allowedCountryIsos = R.pipe(R.map(R.prop('countryIso')), R.reject(R.isNil))(roles)
    const allowedIsoQueryPlaceholders = R.range(1, allowedCountryIsos.length +1).map(i => '$'+i).join(',')
    return db.query(`SELECT country_iso, name 
                     FROM country
                     WHERE country_iso in (${allowedIsoQueryPlaceholders})
                     ORDER BY name ASC`,
                    allowedCountryIsos)
      .then(res => camelize(res))
  }
}

const db = require('../db/db')
const R = require('ramda')
const Promise = require('bluebird')

module.exports.insertAudit = (client, userId, message, countryIso, section, target = null) => {
  console.log('target', target)
  return client.query(
    'INSERT INTO fra_audit (user_id, message, country_iso, section, target) VALUES ($1, $2, $3, $4, $5);',
    [userId, message, countryIso, section, target]
  )
}

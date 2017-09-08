const camelize = require('camelize')
const db = require('../db/db')
const R = require('ramda')

module.exports.insertAudit = (client, userId, message, countryIso, section, target = null) => {
  return client.query(
    'INSERT INTO fra_audit (user_id, message, country_iso, section, target) VALUES ($1, $2, $3, $4, $5);',
    [userId, message, countryIso, section, target]
  )
}


module.exports.getAuditSummary = (countryIso, prefixes) => {
  const toMatch = R.map(p => `${p}%`, prefixes)
  const excludedMsgs = ['createIssue', 'createComment', 'deleteComment']
  return db.query(
    `
      SELECT
        split_part(section, '_', 1) as section_name,
        max(time) as latest_edit
      FROM fra_audit
      WHERE country_iso = $1
            AND section like any ($2)
            AND NOT (message in ($3))
      GROUP BY split_part(section, '_', 1)
    `, [countryIso, toMatch, excludedMsgs]
  ).then(res => camelize(res.rows))
}


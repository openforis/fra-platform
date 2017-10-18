const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')

module.exports.insertAudit = (client, userId, message, countryIso, section, target = null) => {
  return client.query(
    'INSERT INTO fra_audit (user_id, message, country_iso, section, target) VALUES ($1, $2, $3, $4, $5);',
    [userId, message, countryIso, section, target]
  )
}

module.exports.getLastAuditTimeStampForSection = (countryIso, section) => {
  const excludedMsgs = ['createIssue', 'createComment', 'deleteComment']
  return db.query(
    ` SELECT
        split_part(section, '_', 1) as section_name,
        to_char(max(time), 'YYYY-MM-DD"T"HH24:MI:ssZ') as latest_edit
      FROM fra_audit
      WHERE country_iso = $1
            AND section = $2
            AND NOT (message in ($3))
      GROUP BY section_name
    `, [countryIso, section, excludedMsgs]
  ).then(res => R.path(['rows', 0, 'latest_edit'], res))
}

module.exports.getAuditFeed = (countryIso) => {
  return db.query(
    ` WITH unique_feed AS (
        SELECT DISTINCT ON (name, message, section_name)
          fu.name,
          fu.email,
          message,
          split_part(section, '_', 1) AS section_name,
          time,
          target
        FROM fra_audit fa
        JOIN fra_user fu ON fa.user_id=fu.id
        WHERE country_iso = $1 AND message != 'deleteComment'
      )
      SELECT
        name AS full_name,
        email,
        message,
        section_name,
        to_char(time, 'YYYY-MM-DD"T"HH24:MI:ssZ') AS edit_time,
        target
      FROM unique_feed
      ORDER BY edit_time DESC
      LIMIT 20
    `, [countryIso]
  ).then(res => R.map(camelize, res.rows))
}

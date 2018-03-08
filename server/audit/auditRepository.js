const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')

module.exports.insertAudit = async (client, userId, message, countryIso, section, target = null) => {
  const userResult = await client.query('SELECT name, email, login_email FROM fra_user WHERE id = $1', [userId])
  if (userResult.rows.length !== 1) throw new Error(`User ID query resulted in ${userResult.rows.length} rows`)
  const user = camelize(userResult.rows[0])
  await client.query(
    `INSERT INTO 
      fra_audit 
      (user_email, user_login_email, user_name, message, country_iso, section, target) 
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7);`,
    [user.email, user.loginEmail, user.name, message, countryIso, section, target]
  )
}

module.exports.getLastAuditTimeStampForSection = (countryIso, section) => {
  const excludedMsgs = ['createIssue', 'createComment', 'deleteComment']
  return db.query(
    ` SELECT
        section as section_name,
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
    ` SELECT
        u.id as user_id,
        user_name as full_name,
        user_email as email,
        message,
        section AS section_name,
        target,
        to_char(time, 'YYYY-MM-DD"T"HH24:MI:ssZ') AS edit_time
      FROM (
        SELECT
          user_name,
          user_email,
          message,
          section,
          target,
          time,
          rank() OVER (PARTITION BY user_name, user_email, message, section ORDER BY time DESC) as rank
        FROM fra_audit
        WHERE country_iso = $1
        AND message != 'deleteComment'
      ) AS fa
      JOIN
        fra_user u
      ON user_email = u.email  
      WHERE rank = 1
      ORDER BY time DESC
      LIMIT 20
    `, [countryIso]
  ).then(res => R.map(camelize, res.rows))
}

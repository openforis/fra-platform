const camelize = require('camelize')
const db = require('../db/db')

module.exports.getIssues = (countryIso, section) =>
  db.query(`
    SELECT 
      i.id as issue_id, i.target as target, c.id as comment_id,
      c.user_id as user_id, u.email as email, u.name as username,
      c.message as message, c.status_changed as status_changed 
    FROM 
      issue i
    JOIN fra_comment c 
      ON (c.issue_id = i.id)
    JOIN fra_user u 
      ON (u.id = c.user_id)
    WHERE 
      i.country_iso = $1 AND i.section = $2;
  `, [countryIso, section])
    .then(res => camelize(res.rows))

module.exports.allIssues = countryIso => {
  return db.query(`
    SELECT i.id as issue_id, i.section as section, i.target as target, i.status as status
    FROM issue i
    WHERE i.country_iso = $1;
  `, [countryIso]).then(res => {
      return camelize(res.rows)
    }
  )
}

module.exports.getIssuesByTargets = (countryIso, section, targets) =>
  db.query(`
    SELECT 
      i.id as issue_id, i.section, i.target, i.status
    FROM issue i
    WHERE i.country_iso = $1
    AND i.section = $2
    AND i.target in (${targets.join(',')})`
    , [countryIso, section])
    .then(res => camelize(res.rows))

module.exports.createIssueWithComment = (client, countryIso, section, target, userId, msg) =>
  client.query(`
    INSERT INTO issue (country_iso, section, target, status) VALUES ($1, $2, $3, $4);
  `, [countryIso, section, target, 'open'])
    .then(res => client.query(`SELECT last_value FROM issue_id_seq`))
    .then(res => client.query(`
      INSERT INTO fra_comment (issue_id, user_id, message, status_changed)
      VALUES ($1, $2, $3, 'opened');
  `, [res.rows[0].last_value, userId, msg]))

module.exports.createComment = (client, issueId, userId, msg, status_changed) =>
  client.query(`
    INSERT INTO fra_comment (issue_id, user_id, message, status_changed)
    VALUES ($1, $2, $3, $4);
 `, [issueId, userId, msg, status_changed])

module.exports.deleteIssues = (client, countryIso, section, targets) =>
  client.query(`SELECT id AS issue_id FROM issue WHERE country_iso = $1 AND section = $2 AND target IN(${targets.join(',')})`, [countryIso, section])
    .then(res => res.rows.map(r => r.issue_id))
    .then(issue_ids => issue_ids.length > 0 ? client.query(`DELETE from fra_comment WHERE issue_id IN (${issue_ids.join(',')})`).then(() => issue_ids) : [])
    .then(issue_ids => issue_ids.length > 0 ? client.query(`DELETE from issue WHERE id IN (${issue_ids.join(',')})`) : null)



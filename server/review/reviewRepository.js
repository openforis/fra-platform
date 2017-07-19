const camelize = require('camelize')
const db = require('../db/db')
const R = require('ramda')
const Promise = require('bluebird')

module.exports.getIssueComments = (countryIso, section) =>
  db.query(`
    SELECT 
      i.id as issue_id, i.target, 
      u.email, u.name as username,
      c.id as comment_id, c.user_id,
      CASE 
        WHEN c.deleted = true THEN ''
        ELSE c.message 
      END as message, 
      c.status_changed,
      c.deleted 
    FROM 
      issue i
    JOIN fra_comment c 
      ON (c.issue_id = i.id)
    JOIN fra_user u 
      ON (u.id = c.user_id)
    WHERE 
      i.country_iso = $1 AND i.section = $2
    ORDER BY
      c.id  
  `, [countryIso, section])
    .then(res => camelize(res.rows))

module.exports.getIssuesByCountry = countryIso => {
  return db.query(`
    SELECT 
      i.id as issue_id, i.section as section, i.target as target, i.status as status
    FROM 
      issue i
    WHERE 
      i.country_iso = $1
    AND
      i.id in (SELECT DISTINCT c.issue_id FROM fra_comment c WHERE c.deleted = false)  
  `, [countryIso]).then(res => {
      return camelize(res.rows)
    }
  )
}

const getIssuesByParam = (countryIso, section, paramPosition, paramValue) =>
  db.query(`
    SELECT 
      i.id as issue_id, i.section, i.target, i.status
    FROM issue i
    WHERE i.country_iso = $1
    AND i.section = $2
    AND i.target #> '{params,${paramPosition}}' = '"${paramValue}"'
    AND i.id in (SELECT DISTINCT c.issue_id FROM fra_comment c WHERE c.deleted = false)`
    , [countryIso, section])
    .then(res => camelize(res.rows))

module.exports.getIssuesByParam = getIssuesByParam

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

const deleteIssuesByIds = (client, issueIds) => {
  if (issueIds.length > 0) {
    const issueIdQueryPlaceholders = R.range(1, issueIds.length + 1).map(i => '$' + i).join(',')

    return client
      .query(`DELETE from fra_comment WHERE issue_id IN (${issueIdQueryPlaceholders})`, issueIds)
      .then(() =>
        client.query(`DELETE from issue WHERE id IN (${issueIdQueryPlaceholders})`, issueIds)
      )
  } else
    return Promise.resolve()
}

module.exports.deleteIssuesByIds = deleteIssuesByIds

module.exports.deleteIssues = (client, countryIso, section, paramPosition, paramValue) =>
  getIssuesByParam(countryIso, section, paramPosition, paramValue)
    .then(res => res.map(r => r.issueId))
    .then(issueIds => deleteIssuesByIds(client, issueIds))

module.exports.deleteComment = (client, commentId) =>
  client.query('UPDATE fra_comment SET deleted = $1 WHERE id = $2', [true, commentId])


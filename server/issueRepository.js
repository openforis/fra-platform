const camelize = require('camelize')
const db = require('./db/db')

module.exports.getIssues = (countryIso, section) => {
  return db.query(`
    SELECT i.id as issue_id, i.target as target, c.id as comment_id, c.user_id as user_id, u.email as email, u.name as username,
     c.message as message, c.status_changed as status_changed FROM issue i
      JOIN fra_comment c ON (c.issue_id = i.id)
      JOIN fra_user u ON (u.id = c.user_id)
    WHERE i.country_iso = $1 AND i.section = $2;
  `, [countryIso, section]).then(res => {
      return camelize(res.rows)
    }
  )
}

module.exports.createIssueWithComment = (client, countryIso, section, target, userId, msg) => {
  return client.query(`
    INSERT INTO issue (country_iso, section, target, status) VALUES ($1, $2, $3, $4);
  `, [countryIso, section, target,'open'])
    .then(res => client.query(`SELECT last_value FROM issue_id_seq`))
    .then(res => client.query(`
      INSERT INTO fra_comment (issue_id, user_id, message, status_changed)
      VALUES ($1, $2, $3, 'opened');
  `, [res.rows[0].last_value, userId, msg]))
}

module.exports.createComment = (client, issueId, userId, msg, status_changed) => {
 client.query(`
    INSERT INTO fra_comment (issue_id, user_id, message, status_changed)
    VALUES ($1, $2, $3, $4);
 `, [issueId, userId, msg, status_changed])
}

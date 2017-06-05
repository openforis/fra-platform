const camelize = require('camelize')
const db = require('./db/db')

module.exports.getEofIssues = (countryIso, target) => {
  return db.query(`
    SELECT ei.id as issue_id, c.id as comment_id, c.user_id as user_id, u.email as email, c.message as message, c.status_changed as status_changed FROM eof_issue ei
      JOIN fra_comment c ON (c.issue_id = ei.issue_id)
      JOIN fra_user u ON (u.id = c.user_id)
    WHERE ei.country_iso = $1 AND ei.target = $2;
  `, [countryIso, target]).then(res => {
      return camelize(res.rows)
    }
  )
}

module.exports.createEofIssue = (client, countryIso, target, userId, msg) => {
  return client.query(`
    INSERT INTO issue (status) VALUES ($1);
  `, ['open'])
    .then(res => client.query(`SELECT last_value FROM issue_id_seq`))
    .then(res => client.query(`
      INSERT INTO eof_issue (issue_id, country_iso, target) VALUES ($1, $2, $3);
  `, [res.rows[0].last_value, countryIso, target]))
    .then(res => client.query(`SELECT last_value FROM issue_id_seq`))
    .then(res => client.query(`
      INSERT INTO fra_comment (issue_id, user_id, message, status_changed)
      VALUES ($1, $2, $3, 'opened');
  `, [res.rows[0].last_value, userId, msg]))
}

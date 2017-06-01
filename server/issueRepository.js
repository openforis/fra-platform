const R = require('ramda')
const camelize = require('camelize')

module.exports.getEofIssues = (client, countryIso) => {
  return client.query(`
    SELECT i.id as issue_id, c.id as comment_id, c.user_id as user_id, c.message as message, c.status_changed as status_changed FROM eof_issue i
    JOIN fra_comment c ON (c.issue_id = i.id) WHERE i.country_iso = $1;
  `, [countryIso]).then(res => {
      return camelize(res.rows)
    }
  )
}

module.exports.createEofIssue = (client, countryIso, userId, msg) => {
  return client.query(`
    INSERT INTO issue (status) VALUES ($1);
  `, ['open'])
    .then(res => client.query(`SELECT last_value FROM issue_id_seq`))
    .then(res => client.query(`
      INSERT INTO eof_issue (issue_id, country_iso) VALUES ($1, $2);
  `, [res.rows[0].last_value, countryIso]))
    .then(res => client.query(`SELECT last_value FROM issue_id_seq`))
    .then(res => client.query(`
      INSERT INTO fra_comment (issue_id, user_id, message, status_changed)
      VALUES ($1, $2, $3, 'opened');
  `, [res.rows[0].last_value, userId, msg]))
}

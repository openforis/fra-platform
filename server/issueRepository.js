const R = require('ramda')
const camelize = require('camelize')

module.exports.getEofIssues = (client, countryIso) => {
  return client.query(`
    SELECT * FROM eof_issue i WHERE i.countryIso = $1 JOIN fra_comment c ON c.issue_id = i.id ORDER BY c.id ASC;
  `)
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

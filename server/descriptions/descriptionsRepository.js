module.exports.readDescriptions = (client, countryIso, name) =>
  client.query(
    `SELECT content FROM descriptions WHERE country_iso = $1 AND name = $2`,
    [countryIso, name]
  ).then(result => ({[name]: {content: result.rows[0] ? result.rows[0].content : ''}}))

const isEmptyDescriptions = (client, countryIso, name) =>
  client.query('SELECT id FROM descriptions WHERE country_iso = $1 AND name = $2', [countryIso, name])
    .then(result => result.rows.length === 0)

module.exports.persistDescriptions = (client, countryIso, name, content) =>
  isEmptyDescriptions(client, countryIso, name).then(isEmpty =>
    isEmpty
      ? insertDescriptions(client, countryIso, name, content)
      : updateDescriptions(client, countryIso, name, content))

const insertDescriptions = (client, countryIso, name, content) =>
  client.query(`INSERT INTO descriptions (country_iso, name, content) VALUES ($1, $2, $3)`,
    [countryIso, name, content])

const updateDescriptions = (client, countryIso, name, content) =>
  client.query(`UPDATE 
            descriptions 
            SET 
             content = $3
            WHERE country_iso = $1
            AND name = $2`,
    [countryIso, name, content])

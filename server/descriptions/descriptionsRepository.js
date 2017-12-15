module.exports.readDescriptions = (client, countryIso, section, name) =>
  client.query(
    `SELECT content FROM descriptions WHERE country_iso = $1 AND section = $2 AND name = $3`,
    [countryIso, section, name]
  ).then(result => ({[name]: {content: result.rows[0] ? result.rows[0].content : ''}}))

const isEmptyDescriptions = (client, countryIso, section, name) =>
  client.query(
    'SELECT id FROM descriptions WHERE country_iso = $1 AND section = $2 AND name = $3',
    [countryIso, section, name]
  ).then(result => result.rows.length === 0)

module.exports.persistDescriptions = (client, countryIso, section, name, content) =>
  isEmptyDescriptions(client, countryIso, name).then(isEmpty =>
    isEmpty
      ? insertDescriptions(client, countryIso, section, name, content)
      : updateDescriptions(client, countryIso, section, name, content))

const insertDescriptions = (client, countryIso, section, name, content) =>
  client.query(`INSERT INTO descriptions (country_iso, section, name, content) VALUES ($1, $2, $3, $4)`,
    [countryIso, section, name, content])

const updateDescriptions = (client, countryIso, section, name, content) =>
  client.query(`UPDATE 
            descriptions 
            SET 
             content = $4
            WHERE country_iso = $1
            AND section = $2
            AND name = $3`,
    [countryIso, section, name, content])

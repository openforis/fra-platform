module.exports.readDescriptions = (client, countryIso, section, name, schemaName = 'public') => {
  const tableName = `${schemaName}.descriptions`
  return client
    .query(`SELECT content FROM ${tableName} WHERE country_iso = $1 AND section = $2 AND name = $3`, [
      countryIso,
      section,
      name,
    ])
    .then(result => (result.rows[0] ? result.rows[0].content : ''))
}

const isEmptyDescriptions = (client, countryIso, section, name) =>
  client
    .query('SELECT id FROM descriptions WHERE country_iso = $1 AND section = $2 AND name = $3', [
      countryIso,
      section,
      name,
    ])
    .then(result => result.rows.length === 0)

const insertDescriptions = (client, countryIso, section, name, content) =>
  client.query(`INSERT INTO descriptions (country_iso, section, name, content) VALUES ($1, $2, $3, $4)`, [
    countryIso,
    section,
    name,
    content,
  ])

const updateDescriptions = (client, countryIso, section, name, content) =>
  client.query(
    `UPDATE 
              descriptions 
              SET 
               content = $4
              WHERE country_iso = $1
              AND section = $2
              AND name = $3`,
    [countryIso, section, name, content]
  )

module.exports.persistDescriptions = (client, countryIso, section, name, content) =>
  isEmptyDescriptions(client, countryIso, section, name).then(isEmpty =>
    isEmpty
      ? insertDescriptions(client, countryIso, section, name, content)
      : updateDescriptions(client, countryIso, section, name, content)
  )

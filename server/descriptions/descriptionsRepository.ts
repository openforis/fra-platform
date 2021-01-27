module.exports.readDescriptions = (client: any, countryIso: any, section: any, name: any, schemaName = 'public') => {
  const tableName = `${schemaName}.descriptions`
  return client
    .query(`SELECT content FROM ${tableName} WHERE country_iso = $1 AND section = $2 AND name = $3`, [
      countryIso,
      section,
      name,
    ])
    .then((result: any) => (result.rows[0] ? result.rows[0].content : ''))
}

const isEmptyDescriptions = (client: any, countryIso: any, section: any, name: any) =>
  client
    .query('SELECT id FROM descriptions WHERE country_iso = $1 AND section = $2 AND name = $3', [
      countryIso,
      section,
      name,
    ])
    .then((result: any) => result.rows.length === 0)

const insertDescriptions = (client: any, countryIso: any, section: any, name: any, content: any) =>
  client.query(`INSERT INTO descriptions (country_iso, section, name, content) VALUES ($1, $2, $3, $4)`, [
    countryIso,
    section,
    name,
    content,
  ])

const updateDescriptions = (client: any, countryIso: any, section: any, name: any, content: any) =>
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

module.exports.persistDescriptions = (client: any, countryIso: any, section: any, name: any, content: any) =>
  isEmptyDescriptions(client, countryIso, section, name).then((isEmpty: any) =>
    isEmpty
      ? insertDescriptions(client, countryIso, section, name, content)
      : updateDescriptions(client, countryIso, section, name, content)
  )

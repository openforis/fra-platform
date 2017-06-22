const camelize = require('camelize')

module.exports.readDescriptions = (client, countryIso, descField) =>
  client.query(
    `SELECT description FROM descriptions WHERE country_iso = $1 AND field = $2`,
    [countryIso, descField]
  ).then(result => ({[camelize(descField)]: {value: result.rows[0] ? result.rows[0].description : ''}}))

const isEmptyDescriptions = (client, countryIso, descField) =>
  client.query('SELECT id FROM descriptions WHERE country_iso = $1 AND field = $2', [countryIso, descField])
    .then(result => result.rows.length === 0)

module.exports.persistDescriptions = (client, countryIso, descField, value) =>
  isEmptyDescriptions(client, countryIso, descField).then(isEmpty =>
    isEmpty
      ? insertDescriptions(client, countryIso, descField, value)
      : updateDescriptions(client, countryIso, descField, value))

const insertDescriptions = (client, countryIso, descField, value) =>
  client.query(`INSERT INTO descriptions (country_iso, field, description) VALUES ($1, $2, $3)`,
    [countryIso, descField, value])

const updateDescriptions = (client, countryIso, descField, value) =>
  client.query(`UPDATE 
            descriptions 
            SET 
             description = $3
            WHERE country_iso = $1
            AND field = $2`,
    [countryIso, descField, value])

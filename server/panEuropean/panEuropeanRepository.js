const R = require('ramda')
const db = require('../db/db')
const auditRepository = require('./../audit/auditRepository')

module.exports.persistPanEuropeanQuantitativeQuestionnaire = (client, user, countryIso, file) =>
  auditRepository
    .insertAudit(client, user.id, 'persistPanEuropeanQuantitativeQuestionnaire', countryIso, 'panEuropeanIndicators')
    .then(() =>
      client.query('SELECT id FROM pan_european WHERE country_iso = $1', [countryIso])
        .then(resp => R.isEmpty(resp.rows)
          ? insertPanEuropeanQuantitativeQuestionnaire(client, countryIso, file)
          : updatePanEuropeanQuantitativeQuestionnaire(client, countryIso, file)
        )
    )

const insertPanEuropeanQuantitativeQuestionnaire = (client, countryIso, file) =>
  client.query(
    `INSERT INTO
      pan_european (country_iso, quantitative_questionnaire, quantitative_questionnaire_name)
     VALUES
      ($1, $2, $3)
    `, [countryIso, file.data, file.name])

const updatePanEuropeanQuantitativeQuestionnaire = (client, countryIso, file) =>
  client.query(`
    UPDATE
      pan_european
    SET
      quantitative_questionnaire = $1,
      quantitative_questionnaire_name = $2
    WHERE
      country_iso = $3
    `, [file.data, file.name, countryIso])

module.exports.getPanEuropeanQuantitativeQuestionnaire = countryIso =>
  db.query(`
    SELECT
      id, quantitative_questionnaire, quantitative_questionnaire_name
    FROM
      pan_european
    WHERE
      country_iso = $1
    `, [countryIso])
    .then(resp => R.isEmpty(resp.rows)
      ? null
      : {
        quantitativeQuestionnaire: resp.rows[0].quantitative_questionnaire,
        quantitativeQuestionnaireName: resp.rows[0].quantitative_questionnaire_name,
      }
    )

module.exports.deletePanEuropeanQuantitativeQuestionnaire = (client, countryIso) =>
  client.query(`
    DELETE FROM
      pan_european
    WHERE
      country_iso = $1
    `, [countryIso])

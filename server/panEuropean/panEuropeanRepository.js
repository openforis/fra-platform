const R = require('ramda')
const db = require('../db/db')
const auditRepository = require('./../audit/auditRepository')

module.exports.persistPanEuropeanQtyQuestionnaire = (client, user, countryIso, file) =>
  auditRepository
    .insertAudit(client, user.id, 'persistPanEuropeanQtyQuestionnaire', countryIso, 'panEuropeanIndicators')
    .then(() =>
      client.query('SELECT id FROM pan_european WHERE country_iso = $1', [countryIso])
        .then(resp => R.isEmpty(resp.rows)
          ? insertPanEuropeanQtyQuestionnaire(client, countryIso, file)
          : updatePanEuropeanQtyQuestionnaire(client, countryIso, file)
        )
    )

const insertPanEuropeanQtyQuestionnaire = (client, countryIso, file) =>
  client.query(
    `INSERT INTO
      pan_european (country_iso, qty_questionnaire, qty_questionnaire_name)
     VALUES
      ($1, $2, $3)
    `, [countryIso, file.data, file.name])

const updatePanEuropeanQtyQuestionnaire = (client, countryIso, file) =>
  client.query(`
    UPDATE
      pan_european
    SET
      qty_questionnaire = $1,
      qty_questionnaire_name = $2
    WHERE
      country_iso = $3
    `, [file.data, file.name, countryIso])

module.exports.getPanEuropeanQtyQuestionnaire = countryIso =>
  db.query(`
    SELECT
      id, qty_questionnaire, qty_questionnaire_name
    FROM
      pan_european
    WHERE
      country_iso = $1
    `, [countryIso])
    .then(resp => R.isEmpty(resp.rows)
      ? null
      : {
        qtyQuestionnaire: resp.rows[0].qty_questionnaire,
        qtyQuestionnaireName: resp.rows[0].qty_questionnaire_name,
      }
    )

module.exports.deletePanEuropeanQtyQuestionnaire = (client, countryIso) =>
  client.query(`
    DELETE FROM
      pan_european
    WHERE
      country_iso = $1
    `, [countryIso])

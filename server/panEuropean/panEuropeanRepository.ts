// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'format'.
const { format } = require('date-fns')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'auditRepos... Remove this comment to see the full error message
const auditRepository = require('../audit/auditRepository')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fileName'.
const fileName = (fileName: any, countryIso: any) =>
  `${fileName.substring(0, fileName.lastIndexOf('.'))}_${countryIso}_${format(
    new Date(),
    'yyyyMMdd'
  )}.${fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)}`

module.exports.persistPanEuropeanQuantitativeQuestionnaire = (client: any, user: any, countryIso: any, file: any) =>
  auditRepository
    .insertAudit(client, user.id, 'persistPanEuropeanQuantitativeQuestionnaire', countryIso, 'panEuropeanIndicators')
    .then(() =>
      client
        .query('SELECT id FROM pan_european WHERE country_iso = $1', [countryIso])
        .then((resp: any) =>
          R.isEmpty(resp.rows)
            ? insertPanEuropeanQuantitativeQuestionnaire(client, countryIso, file)
            : updatePanEuropeanQuantitativeQuestionnaire(client, countryIso, file)
        )
    )

const insertPanEuropeanQuantitativeQuestionnaire = (client: any, countryIso: any, file: any) =>
  client.query(
    `INSERT INTO
      pan_european (country_iso, quantitative_questionnaire, quantitative_questionnaire_name)
     VALUES
      ($1, $2, $3)
    `,
    // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
    [countryIso, file.data, fileName(file.name, countryIso)]
  )

const updatePanEuropeanQuantitativeQuestionnaire = (client: any, countryIso: any, file: any) =>
  client.query(
    `
    UPDATE
      pan_european
    SET
      quantitative_questionnaire = $1,
      quantitative_questionnaire_name = $2
    WHERE
      country_iso = $3
    `,
    // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
    [file.data, fileName(file.name, countryIso), countryIso]
  )

module.exports.getPanEuropeanQuantitativeQuestionnaire = (countryIso: any, schemaName = 'public') => {
  const tableName = `${schemaName}.pan_european`
  return db
    .query(
      `
    SELECT
      id, quantitative_questionnaire, quantitative_questionnaire_name
    FROM
      ${tableName}
    WHERE
      country_iso = $1
    `,
      [countryIso]
    )
    .then((resp: any) =>
      R.isEmpty(resp.rows)
        ? null
        : {
            quantitativeQuestionnaire: resp.rows[0].quantitative_questionnaire,
            quantitativeQuestionnaireName: resp.rows[0].quantitative_questionnaire_name,
          }
    )
}

module.exports.deletePanEuropeanQuantitativeQuestionnaire = (client: any, countryIso: any) =>
  client.query(
    `
    DELETE FROM
      pan_european
    WHERE
      country_iso = $1
    `,
    [countryIso]
  )

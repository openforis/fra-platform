import * as R from 'ramda'
import { format } from 'date-fns'
import * as db from '../db/db'
import * as auditRepository from '../repository/audit/auditRepository'

const fileName = (fileName: any, countryIso: any) =>
  `${fileName.substring(0, fileName.lastIndexOf('.'))}_${countryIso}_${format(
    new Date(),
    'yyyyMMdd'
  )}.${fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)}`

export const persistPanEuropeanQuantitativeQuestionnaire = (client: any, user: any, countryIso: any, file: any) =>
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
    [file.data, fileName(file.name, countryIso), countryIso]
  )

export const getPanEuropeanQuantitativeQuestionnaire = (countryIso: any, schemaName = 'public') => {
  const tableName = `${schemaName}.pan_european`
  return db.pool
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

export const deletePanEuropeanQuantitativeQuestionnaire = (client: any, countryIso: any) =>
  client.query(
    `
    DELETE FROM
      pan_european
    WHERE
      country_iso = $1
    `,
    [countryIso]
  )

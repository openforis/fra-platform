const db = require('../db/db')

module.exports.changeAssessmentStatus =
  (client, countryIso, assessmentType, status) =>
    client.query(
        `SELECT 
           country_iso
         FROM 
           assessment 
         WHERE country_iso = $1
         AND type = $2`,
        [countryIso, assessmentType]
    ).then(result =>
      result.rows.length === 0
        ? client.query(
        `INSERT INTO
            assessment (country_iso, type, status)  
           VALUES ($1, $2, $3)`,
          [countryIso, assessmentType, status])
        : client.query(
        `UPDATE assessment
           SET status = $1
           WHERE country_iso = $2
           AND type = $3`,
          [status, countryIso, assessmentType])
    )

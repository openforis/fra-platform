const db = require('../db/db')
const camelize = require('camelize')
const R = require('ramda')

const { mostPowerfulRole } = require('../../common/countryRole')
const { getAllowedStatusTransitions } = require('../../common/assessment')
const { AccessControlException } = require('../utils/accessControl')

module.exports.changeAssessmentStatus =
  (client, countryIso, user, assessmentType, status) =>
    client.query(
        `SELECT 
           status
         FROM 
           assessment 
         WHERE country_iso = $1
         AND type = $2`,
        [countryIso, assessmentType]
    ).then(result => {
      const noStatusYet = result.rows.length === 0
      const currentStatusForAccessControlCheck = noStatusYet ? 'editing' : result.rows[0].status
      const role = mostPowerfulRole(countryIso, user)
      const allowed = getAllowedStatusTransitions(role, currentStatusForAccessControlCheck)

      if (!R.contains(status, R.values(allowed))) {
        throw new AccessControlException(
          `Transition from ${currentStatusForAccessControlCheck} to ${status} not allowed for role ${role.role}`
        )
      }

      return noStatusYet
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
      }
    )

module.exports.getAssessmentStatuses = (countryIso) =>
  db.query(
    `SELECT
       type AS assessment_type,
       status
      FROM
        assessment
      WHERE
        country_iso = $1`,
    [countryIso]
  ).then(result => R.map(camelize, result.rows))

const db = require('../db/db')
const camelize = require('camelize')
const R = require('ramda')

const {roleForCountry} = require('../../common/countryRole')
const {getAllowedStatusTransitions} = require('../../common/assessment')
const {AccessControlException} = require('../utils/accessControl')

const checkStatusTransitionAllowance = (currentStatus, newStatus, role) => {
  const allowed = getAllowedStatusTransitions(role, currentStatus)
  if (!R.contains(newStatus, R.values(allowed))) {
    throw new AccessControlException('error.assessment.transitionNotAllowed', {
      currentStatus: currentStatus,
      status: newStatus,
      role: role.role
    })
  }
}

const getAssessment = async (client, countryIso, assessmentType) => {
  const result = await client.query(
    `SELECT 
           status,
           desk_study
         FROM 
           assessment 
         WHERE country_iso = $1
         AND type = $2`,
    [countryIso, assessmentType]
  )
  if (result.rows.length === 0) return null
  return camelize(result.rows[0])
}

const addAssessment = (client, countryIso, assessmentType, status) =>
  client.query(
    `INSERT INTO
      assessment 
      (country_iso, type, status)  
     VALUES 
      ($1, $2, $3)`,
    [countryIso, assessmentType, status]
  )

const updateAssessment = (client, countryIso, assessmentType, status) =>
  client.query(
    `UPDATE assessment
     SET status = $1
     WHERE country_iso = $2
     AND type = $3`,
    [status, countryIso, assessmentType]
  )

module.exports.changeAssessmentStatus =
  async (client, countryIso, user, assessmentType, status) => {
    const currentAssessment = await getAssessment(client, countryIso, assessmentType)
    const currentStatus = !currentAssessment ? 'editing' : currentAssessment.status
    const role = roleForCountry(countryIso, user)
    checkStatusTransitionAllowance(currentStatus, status, role)
    if (currentAssessment) {
      await updateAssessment(client, countryIso, assessmentType, status)
    } else {
      await addAssessment(client, countryIso, assessmentType, status)
    }
  }

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

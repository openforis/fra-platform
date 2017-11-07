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
           desk_study,
           type
         FROM 
           assessment 
         WHERE country_iso = $1
         AND type = $2`,
    [countryIso, assessmentType]
  )
  if (result.rows.length === 0) return null
  return camelize(result.rows[0])
}

const addAssessment = (client, countryIso, assessment) =>
  client.query(
    `INSERT INTO
      assessment 
      (country_iso, type, status)  
     VALUES 
      ($1, $2, $3)`,
    [countryIso, assessment.type, assessment.status]
  )

const updateAssessment = (client, countryIso, assessment) =>
  client.query(
    `UPDATE assessment
     SET status = $1
     WHERE country_iso = $2
     AND type = $3`,
    [assessment.status, countryIso, assessment.type]
  )

module.exports.changeAssessmentStatus =
  async (client, countryIso, user, assessmentType, newStatus) => {
    const currentAssessmentFromDb = await getAssessment(client, countryIso, assessmentType)
    const existsInDb = !!currentAssessmentFromDb
    const currentAssessment = existsInDb
      ? currentAssessmentFromDb
      : {status: 'editing', deskStudy: false, type: assessmentType}
    const role = roleForCountry(countryIso, user)
    checkStatusTransitionAllowance(currentAssessment.status, newStatus, role)
    const newAssessment = {...currentAssessment, status: newStatus}
    if (existsInDb) {
      await updateAssessment(client, countryIso, newAssessment)
    } else {
      await addAssessment(client, countryIso, newAssessment)
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

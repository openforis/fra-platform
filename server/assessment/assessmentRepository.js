const db = require('../db/db')
const camelize = require('camelize')
const R = require('ramda')

const { insertAudit } = require('../audit/auditRepository')
const { roleForCountry, isAdministrator } = require('../../common/countryRole')
const { getAllowedStatusTransitions } = require('../../common/assessment')
const { AccessControlException } = require('../utils/accessControl')

const checkStatusTransitionAllowance = (currentStatus, newStatus, countryIso, user) => {
  const allowed = getAllowedStatusTransitions(countryIso, user, currentStatus)
  if (!R.contains(newStatus, R.values(allowed))) {
    throw new AccessControlException('error.assessment.transitionNotAllowed', {
      currentStatus,
      status: newStatus,
      role: roleForCountry(countryIso, user).role,
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
      (country_iso, type, status, desk_study)  
     VALUES 
      ($1, $2, $3, $4)`,
    [countryIso, assessment.type, assessment.status, assessment.deskStudy]
  )

const updateAssessment = (client, countryIso, assessment) =>
  client.query(
    `UPDATE assessment
     SET status = $1, desk_study = $2
     WHERE country_iso = $3
     AND type = $4`,
    [assessment.status, assessment.deskStudy, countryIso, assessment.type]
  )

// Returns a boolean telling whether status was changed
// (used to determine whether we should send a status-change email)
module.exports.changeAssessment = async (client, countryIso, user, newAssessment) => {
  const currentAssessmentFromDb = await getAssessment(client, countryIso, newAssessment.type)
  const existsInDb = !!currentAssessmentFromDb
  const currentAssessment = existsInDb ? currentAssessmentFromDb : defaultAssessment(newAssessment.assessment)
  const isStatusChange = currentAssessment.status !== newAssessment.status
  if (isStatusChange) {
    checkStatusTransitionAllowance(currentAssessment.status, newAssessment.status, countryIso, user)
  }
  if (currentAssessment.deskStudy !== newAssessment.deskStudy && !isAdministrator(user)) {
    throw new AccessControlException('error.assessment.deskStudyNotAllowed')
  }
  if (existsInDb) {
    await updateAssessment(client, countryIso, newAssessment)
  } else {
    await addAssessment(client, countryIso, newAssessment)
  }
  // insert audit log
  if (isStatusChange)
    insertAudit(client, user.id, 'updateAssessmentStatus', countryIso, 'assessment', {
      assessment: newAssessment.type,
      status: newAssessment.status,
    })

  return isStatusChange
}

const defaultAssessment = (assessmentType) => ({
  status: 'editing',
  deskStudy: false,
  // TODO remove usage of type as property throughout the code
  type: assessmentType,
})

const defaultStatuses = R.pipe(
  R.map((assessmentType) => [assessmentType, defaultAssessment(assessmentType)]),
  R.fromPairs
)(['annuallyUpdated', 'fra2020'])

module.exports.getAssessments = async (countryIso) => {
  const rawResults = await db.query(
    `SELECT
       type,
       status,
       desk_study
      FROM
        assessment
      WHERE
        country_iso = $1`,
    [countryIso]
  )

  const assessmentsFromDb = R.map(camelize, rawResults.rows)
  const assessmentsAsObject = R.reduce(
    (resultObj, assessment) => R.assoc(assessment.type, assessment, resultObj),
    {},
    assessmentsFromDb
  )
  return R.merge(defaultStatuses, assessmentsAsObject)
}

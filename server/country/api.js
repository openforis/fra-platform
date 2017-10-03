const Promise = require('bluebird')
const R = require('ramda')

const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

const countryRepository = require('./countryRepository')
const reviewRepository = require('../review/reviewRepository')
const odpRepository = require('../odp/odpRepository')
const assessmentRepository = require('../assessment/assessmentRepository')
const auditRepository = require('../audit/auditRepository')

const defaultStatuses = {
  'annuallyUpdated': 'editing',
  'fra2020': 'editing'
}

const prefixes = [
  'extentOfForest',
  'growingStock',
  'forestAreaChange',
  'forestCharacteristic',
  'specificForestCategories',
  'primaryDesignatedManagementObjective',
  'areaAffectedByFire',
  'biomassStock',
  'carbonStock'
]

const simplifyAssessmentStatuses = statuses =>
  R.reduce((resultObj, status) => R.assoc(status.assessmentType, status.status, resultObj), {}, statuses)

module.exports.init = app => {

  app.get('/country/all', (req, res) => {
    countryRepository.getAllowedCountries(req.user.roles).then(result => {
      res.json(result)
    }).catch(err => sendErr(res, err))
  })

  app.get('/country/overviewStatus/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const odpData = odpRepository.listAndValidateOriginalDataPoints(req.params.countryIso)
    const reviewStatus = reviewRepository.getCountryIssuesSummary(req.params.countryIso, req.user)
    const assessmentStatuses = assessmentRepository.getAssessmentStatuses(req.params.countryIso)
    const auditSummary = auditRepository.getAuditSummary(req.params.countryIso, prefixes)

    Promise.all(
      [
        odpData,
        reviewStatus,
        assessmentStatuses,
        auditSummary
      ]
    ).then(([odps, reviewStatus, assessmentStatusResult, auditSummary]) => {
        const odpStatus = {
          count: odps.length,
          errors: R.filter(o => !o.validationStatus.valid, odps).length !== 0,
        }
        res.json(
          {
            odpStatus,
            reviewStatus,
            assessmentStatuses: R.merge(
              defaultStatuses,
              simplifyAssessmentStatuses(assessmentStatusResult)
            ),
            auditSummary
          })
      }
    ).catch(err => sendErr(res, err))
  })
}

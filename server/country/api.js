const Promise = require('bluebird')
const R = require('ramda')

const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

const countryRepository = require('./countryRepository')
const reviewRepository = require('../review/reviewRepository')
const odpRepository = require('../odp/odpRepository')
const assessmentRepository = require('../assessment/assessmentRepository')

const simplifyAssessmentStatuses = statuses =>
  R.reduce((resultObj, status) => R.assoc(status.assessmentType, status.status, resultObj), {}, statuses)

module.exports.init = app => {

  app.get('/country/all', (req, res) => {
    const user = req.session.passport.user
    countryRepository.getAllowedCountries(user.roles).then(result => {
      res.json(result)
    }).catch(err => sendErr(res, err))
  })

  app.get('/country/overviewStatus/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const odpData = odpRepository.listAndValidateOriginalDataPoints(req.params.countryIso)
    const reviewStatus = reviewRepository.getIssuesByCountry(req.params.countryIso)
    const assessmentStatuses = assessmentRepository.getAssessmentStatuses(req.params.countryIso)

    Promise.all(
      [
        odpData,
        reviewStatus,
        assessmentStatuses
      ]
    ).then(([odps, reviewStatus, assessmentStatusResult]) => {
        const odpStatus = {
          count: odps.length,
          errors: R.filter(o => !o.validationStatus.valid, odps).length !== 0,
        }
        res.json(
          {
            odpStatus,
            reviewStatus,
            assessmentStatuses: simplifyAssessmentStatuses(assessmentStatusResult)
          })
      }
    ).catch(err => sendErr(res, err))
  })
}

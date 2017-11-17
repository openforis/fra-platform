const Promise = require('bluebird')
const R = require('ramda')

const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

const countryRepository = require('./countryRepository')
const reviewRepository = require('../review/reviewRepository')
const odpRepository = require('../odp/odpRepository')
const assessmentRepository = require('../assessment/assessmentRepository')
const auditRepository = require('../audit/auditRepository')
const countryConfig = require('../../common/countryConfig')

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
    const assessments = assessmentRepository.getAssessments(req.params.countryIso)
    Promise.all(
      [
        odpData,
        reviewStatus,
        assessments
      ]
    ).then(([odps, reviewStatus, assessments]) => {
        const odpStatus = {
          count: odps.length,
          errors: R.filter(o => !o.validationStatus.valid, odps).length !== 0,
        }
        res.json(
          {
            odpStatus,
            reviewStatus,
            assessments
          })
      }
    ).catch(err => sendErr(res, err))
  })

  app.get('/country/config/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    res.json(countryConfig[req.params.countryIso])
  })
}

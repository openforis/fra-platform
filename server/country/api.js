const Promise = require('bluebird')
const R = require('ramda')
const db = require('../db/db')

const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

const countryRepository = require('./countryRepository')
const reviewRepository = require('../review/reviewRepository')
const odpRepository = require('../odp/odpRepository')
const assessmentRepository = require('../assessment/assessmentRepository')
const auditRepository = require('../audit/auditRepository')
const countryConfig = require('./countryConfig')

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

  // Changes one key/value pair
  app.post('/country/config/:countryIso', async (req, res) => {
    checkCountryAccessFromReqParams(req)
    try {
      await db.transaction(countryRepository.saveDynamicConfigurationVariable,
        [
          req.params.countryIso,
          req.body.key,
          req.body.value
        ]
      )
      res.json({})
    } catch (e) {
      sendErr(res, e)
    }
  })

  app.get('/country/config/:countryIso', async (req, res) => {
    checkCountryAccessFromReqParams(req)
    try {
      const dynamicConfig = await countryRepository.getDynamicCountryConfiguration(req.params.countryIso)
      const staticConfig = countryConfig[req.params.countryIso]
      const fullConfig = R.mergeDeepRight(staticConfig, dynamicConfig)
      res.json(fullConfig)
    } catch (e) {
      sendErr(res, e)
    }
  })
}

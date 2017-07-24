const Promise = require('bluebird')
const R = require('ramda')

const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const reviewRepository = require('../review/reviewRepository')
const odpRepository = require('../odp/odpRepository')
const assessmentRepository = require('../assessment/assessmentRepository')

module.exports.init = app => {

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
    ).then(([odps, reviewStatus, assessmentStatuses]) => {
      const odpStatus = {
        count: odps.length,
        errors: R.filter(o => !o.validationStatus.valid, odps).length !== 0,
      }
      res.json({odpStatus, reviewStatus, assessmentStatuses})
    })
      .catch(err => sendErr(res, err))
  })
}

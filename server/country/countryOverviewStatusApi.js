const Promise = require('bluebird')
const R = require('ramda')

const { sendErr } = require('../utils/requestUtils')
const { checkCountryAccessFromReqParams } = require('../utils/accessControl')
const reviewRepository = require('../review/reviewRepository')
const odpRepository = require('../odp/odpRepository')

module.exports.init = app => {

  app.get('/country/overviewStatus/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const odpData = odpRepository.listAndValidateOriginalDataPoints(req.params.countryIso)
    const reviewStatus = reviewRepository.getIssuesByCountry(req.params.countryIso)

    // in future we certainly will need the Promise.all here wink wink
    Promise.all([odpData, reviewStatus]).then(([odps, reviewResult]) => {
      const odpStatus = {
        count: odps.length,
        errors: R.filter(o => !o.validationStatus.valid, odps).length !== 0,
      }

      res.json(R.merge({reviewStatus: reviewResult}, {odpStatus}))
    })
      .catch(err => sendErr(res, err))
  })
}

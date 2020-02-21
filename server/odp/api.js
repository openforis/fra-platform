const R = require('ramda')
const Promise = require('bluebird')

const db = require('../db/db')
const odpRepository = require('./odpRepository')
const reviewRepository = require('../review/reviewRepository')

const {sendErr, sendOk} = require('../utils/requestUtils')

const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {allowedToEditDataCheck} = require('../assessment/assessmentEditAccessControl')

const Auth = require('../auth/authApiMiddleware')

module.exports.init = app => {

  app.get('/odp', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const odp = R.isNil(req.query.odpId) ? Promise.resolve({}) : odpRepository.getOdp(req.query.odpId)
      const odps = odpRepository.listOriginalDataPoints(req.query.countryIso)

      const [odpResult, odpsResult] = await Promise.all([odp, odps])

      const result = R.merge(
        odpResult,
        {
          reservedYears: R.pipe(
            R.values,
            R.map(R.prop('year')),
            R.uniq,
            R.reject(R.equals(R.defaultTo(null, odpResult.year))) // odp's year is not reserved for the odp itself
          )(odpsResult)
        }
      )
      return res.json(result)

    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/odps/:countryIso', async (req, res) => {
      try {
        checkCountryAccessFromReqParams(req)

        const odps = await odpRepository.listAndValidateOriginalDataPoints(req.params.countryIso)

        const issues = odps.map(odp =>
          reviewRepository
            .getIssuesSummary(req.params.countryIso, 'odp', odp.odpId, req.user, true)
            .then(issues => R.assoc('issuesSummary', issues, odp))
        )
        const odpsWithIssues = await Promise.all(issues)

        res.json(odpsWithIssues)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )

  app.delete('/odp', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const countryIso = req.query.countryIso
      await allowedToEditDataCheck(countryIso, req.user, 'extentOfForest')

      await db.transaction(odpRepository.deleteOdp, [req.query.odpId, req.user])

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/odp/draft', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const countryIso = req.query.countryIso
      const result = await db.transaction(odpRepository.saveDraft, [countryIso, req.user, req.body])
      res.json(result)

    } catch (err) {
      sendErr(res, err)
    }
  })

  app.delete('/odp/draft', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const countryIso = req.query.countryIso
      await allowedToEditDataCheck(countryIso, req.user, 'extentOfForest')

      await db.transaction(odpRepository.deleteDraft, [req.query.odpId, req.user])

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/prevOdp/:countryIso/:year', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const countryIso = req.query.countryIso
      await allowedToEditDataCheck(countryIso, req.user, 'extentOfForest')

      const resp = await odpRepository.listOriginalDataPoints(req.params.countryIso)

      const prevOdp = R.pipe(
        R.filter(o => o.year !== 0 && o.year < req.params.year),
        R.sort((a, b) => b.year - a.year),
        R.head
      )(R.values(resp))

      if (prevOdp) {
        const odp = await odpRepository.getOdp(prevOdp.odpId)
        res.json(odp)
      } else {
        sendOk(res)
      }

    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/odp/markAsActual', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      await db.transaction(odpRepository.markAsActual, [req.query.odpId, req.user])

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

}

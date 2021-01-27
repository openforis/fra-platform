// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'odpReposit... Remove this comment to see the full error message
const odpRepository = require('./odpRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'reviewRepo... Remove this comment to see the full error message
const reviewRepository = require('../review/reviewRepository')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr, sendOk } = require('../utils/requestUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'checkCount... Remove this comment to see the full error message
const { checkCountryAccessFromReqParams } = require('../utils/accessControl')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'allowedToE... Remove this comment to see the full error message
const { allowedToEditDataCheck } = require('../assessment/assessmentEditAccessControl')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'VersionSer... Remove this comment to see the full error message
const VersionService = require('../versioning/service')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Auth'.
const Auth = require('../auth/authApiMiddleware')

module.exports.init = (app: any) => {
  app.get('/odp', async (req: any, res: any) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)

      const odp = R.isNil(req.query.odpId) ? Promise.resolve({}) : odpRepository.getOdp(req.query.odpId, schemaName)

      const odps = odpRepository.listOriginalDataPoints(req.query.countryIso, schemaName)

      const [odpResult, odpsResult] = await Promise.all([odp, odps])

      const result = R.merge(odpResult, {
        reservedYears: R.pipe(
          R.values,
          R.map(R.prop('year')),
          R.uniq,
          R.reject(R.equals(R.defaultTo(null, odpResult.year))) // odp's year is not reserved for the odp itself
        )(odpsResult),
      })
      return res.json(result)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/odps/:countryIso', async (req: any, res: any) => {
    try {
      const odps = await odpRepository.listAndValidateOriginalDataPoints(req.params.countryIso)

      if (req.user) {
        checkCountryAccessFromReqParams(req)

        const issues = odps.map((odp: any) =>
          reviewRepository
            .getIssuesSummary(req.params.countryIso, 'odp', odp.odpId, req.user, true)
            .then((issues: any) => R.assoc('issuesSummary', issues, odp))
        )
        const odpsWithIssues = await Promise.all(issues)

        res.json(odpsWithIssues)
      } else {
        res.json(odps)
      }
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.delete('/odp', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      const { countryIso } = req.query
      await allowedToEditDataCheck(countryIso, req.user, 'extentOfForest')

      await db.transaction(odpRepository.deleteOdp, [req.query.odpId, req.user])

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/odp/draft', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      const { countryIso } = req.query
      const result = await db.transaction(odpRepository.saveDraft, [countryIso, req.user, req.body])
      res.json(result)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.delete('/odp/draft', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      const { countryIso } = req.query
      await allowedToEditDataCheck(countryIso, req.user, 'extentOfForest')

      const { odpId } = await db.transaction(odpRepository.deleteDraft, [req.query.odpId, req.user])
      const odp = await odpRepository.getOdp(odpId)

      res.json({ odp })
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/prevOdp/:countryIso/:year', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      const { countryIso } = req.query
      await allowedToEditDataCheck(countryIso, req.user, 'extentOfForest')

      const resp = await odpRepository.listOriginalDataPoints(req.params.countryIso)

      const prevOdp = R.pipe(
        R.filter((o: any) => o.year !== 0 && o.year < req.params.year),
        R.sort((a: any, b: any) => b.year - a.year),
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

  app.post('/odp/markAsActual', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      await db.transaction(odpRepository.markAsActual, [req.query.odpId, req.user])

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })
}

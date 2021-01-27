// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr, sendOk } = require('../utils/requestUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fraReposit... Remove this comment to see the full error message
const fraRepository = require('./fraRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'odpReposit... Remove this comment to see the full error message
const odpRepository = require('../odp/odpRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'auditRepos... Remove this comment to see the full error message
const auditRepository = require('../audit/auditRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'estimation... Remove this comment to see the full error message
const estimationEngine = require('./estimationEngine')
const fraValueService = require('./fraValueService')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'defaultYea... Remove this comment to see the full error message
const defaultYears = require('./defaultYears')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Auth'.
const Auth = require('../auth/authApiMiddleware')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'VersionSer... Remove this comment to see the full error message
const VersionService = require('../versioning/service')

const fraWriters = {
  extentOfForest: fraRepository.persistEofValues,
  forestCharacteristics: fraRepository.persistFocValues,
}
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'odpReaders... Remove this comment to see the full error message
const odpReaders = {
  extentOfForest: odpRepository.readEofOdps,
  forestCharacteristics: odpRepository.readFocOdps,
}

module.exports.init = (app: any) => {
  app.post('/nde/:section/:countryIso', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    const { section } = req.params
    const { countryIso } = req.params
    try {
      await db.transaction(auditRepository.insertAudit, [req.user.id, 'saveFraValues', countryIso, req.params.section])

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const writer = fraWriters[section]
      const updates = R.map((c: any) => writer(countryIso, c.year, c), req.body)
      for (const update of updates) {
        await update
      }

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  // persists section fra values
  app.post('/nde/:section/country/:countryIso/:year', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    const { section } = req.params
    const { countryIso } = req.params
    try {
      await db.transaction(auditRepository.insertAudit, [req.user.id, 'saveFraValues', countryIso, section])

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const writer = fraWriters[section]
      await writer(countryIso, req.params.year, req.body)

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/nde/:section/:countryIso', async (req: any, res: any) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const fra = await fraValueService.getFraValues(req.params.section, req.params.countryIso, schemaName)
      res.json(fra)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post(
    '/nde/:section/generateFraValues/:countryIso',
    Auth.requireCountryEditPermission,
    async (req: any, res: any) => {
      const { section } = req.params
      const { countryIso } = req.params

      try {
        await db.transaction(auditRepository.insertAudit, [req.user.id, 'generateFraValues', countryIso, section])

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const readOdp = odpReaders[section]
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const writer = fraWriters[section]
        const generateSpec = req.body

        await estimationEngine.estimateAndWrite(readOdp, writer, countryIso, defaultYears, generateSpec)

        const schemaName = await VersionService.getDatabaseSchema(req)
        const fra = await fraValueService.getFraValues(req.params.section, req.params.countryIso, schemaName)
        res.json(fra)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )
}

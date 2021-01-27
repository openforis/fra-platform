// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr, sendOk } = require('../utils/requestUtils')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'repository... Remove this comment to see the full error message
const repository = require('./descriptionsRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'auditRepos... Remove this comment to see the full error message
const auditRepository = require('../audit/auditRepository')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Auth'.
const Auth = require('../auth/authApiMiddleware')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'VersionSer... Remove this comment to see the full error message
const VersionService = require('../versioning/service')

module.exports.init = (app: any) => {
  app.get('/country/descriptions/:countryIso/:section/:name', async (req: any, res: any) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const result = await db.transaction(repository.readDescriptions, [
        req.params.countryIso,
        req.params.section,
        req.params.name,
        schemaName,
      ])

      res.json(result)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post(
    '/country/descriptions/:countryIso/:section/:name',
    Auth.requireCountryEditPermission,
    async (req: any, res: any) => {
      const { countryIso, section, name } = req.params
      const { content } = req.body
      try {
        await db.transaction(auditRepository.insertAudit, [req.user.id, 'saveDescriptions', countryIso, section])
        await db.transaction(repository.persistDescriptions, [countryIso, section, name, content])

        sendOk(res)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )
}

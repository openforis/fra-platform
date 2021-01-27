// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'auditRepos... Remove this comment to see the full error message
const auditRepository = require('./auditRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr } = require('../utils/requestUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Auth'.
const Auth = require('../auth/authApiMiddleware')

module.exports.init = (app: any) => {
  app.get(
    '/audit/getLatestAuditLogTimestamp/:countryIso',
    Auth.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const timeStamp = await auditRepository.getLastAuditTimeStampForSection(
          req.params.countryIso,
          req.query.section
        )

        res.json({ timeStamp })
      } catch (err) {
        sendErr(res, err)
      }
    }
  )

  app.get('/audit/getAuditFeed/:countryIso', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      const feed = await auditRepository.getAuditFeed(req.params.countryIso)

      res.json({ feed })
    } catch (err) {
      sendErr(res, err)
    }
  })
}

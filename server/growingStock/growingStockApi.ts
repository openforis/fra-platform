// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr } = require('../utils/requestUtils')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'repository... Remove this comment to see the full error message
const repository = require('./growingStockRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Auth'.
const Auth = require('../auth/authApiMiddleware')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'VersionSer... Remove this comment to see the full error message
const VersionService = require('../versioning/service')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'GrowingSto... Remove this comment to see the full error message
const GrowingStockService = require('./growingStockService')

module.exports.init = (app: any) => {
  app.get('/growingStock/:countryIso', async (req: any, res: any) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const growingStock = await GrowingStockService.getGrowingStock(req.params.countryIso, schemaName)
      res.json(growingStock)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/growingStock/:countryIso', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      await db.transaction(repository.persistBothGrowingStock, [req.user, req.params.countryIso, req.body])
      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })
}

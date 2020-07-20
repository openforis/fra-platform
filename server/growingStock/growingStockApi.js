const db = require('../db/db')
const { sendErr } = require('../utils/requestUtils')
const repository = require('./growingStockRepository')
const Auth = require('../auth/authApiMiddleware')

const VersionService = require('../versioning/service')

const GrowingStockService = require('./growingStockService')

module.exports.init = app => {

  app.get('/growingStock/:countryIso', async (req, res) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const growingStock = await GrowingStockService.getGrowingStock(req.params.countryIso, schemaName)
      res.json(growingStock)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/growingStock/:countryIso', Auth.requireCountryEditPermission, async (req, res) => {
    try {

      await db.transaction(repository.persistBothGrowingStock, [req.user, req.params.countryIso, req.body])
      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })

}

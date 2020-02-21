const db = require('../db/db')
const { sendErr } = require('../utils/requestUtils')
const { checkCountryAccessFromReqParams } = require('../utils/accessControl')
const repository = require('./growingStockRepository')
const Auth = require('../auth/authApiMiddleware')

const GrowingStockService = require('./growingStockService')

module.exports.init = app => {

  app.get('/growingStock/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const growingStock = await GrowingStockService.getGrowingStock(req.params.countryIso)

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

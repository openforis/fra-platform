const db = require('../db/db')
const repository = require('./traditionalTableRepository')
const {sendErr, sendOk} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

const Auth = require('../auth/authApiMiddleware')

module.exports.init = app => {

  app.post('/traditionalTable/:countryIso/:tableSpecName', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const tableSpecName = req.params.tableSpecName
      const countryIso = req.params.countryIso

      await db.transaction(
        repository.save,
        [req.user, countryIso, tableSpecName, req.body]
      )

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/traditionalTable/:countryIso/:tableSpecName', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const result = await repository.read(req.params.countryIso, req.params.tableSpecName)
      res.json(result)
    } catch (err) {
      sendErr(res, err)
    }
  })

}

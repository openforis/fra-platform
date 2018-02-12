const db = require('../db/db')
const repository = require('./traditionalTableRepository')
const {sendErr, sendOk} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

module.exports.init = app => {

  app.post('/traditionalTable/:countryIso/:tableSpecName', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      await db.transaction(
        repository.save,
        [req.user, req.params.countryIso, req.params.tableSpecName, req.body]
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

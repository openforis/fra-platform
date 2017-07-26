const db = require('../db/db')
const repository = require('./traditionalTableRepository')
const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

module.exports.init = app => {
  app.post('/traditionalTable/:countryIso/:tableSpecName', (req, res) => {
    checkCountryAccessFromReqParams(req)
    db.transaction(repository.save, [req.params.countryIso, req.params.tableSpecName, req.body])
      .then(result => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/traditionalTable/:countryIso/:tableSpecName', (req, res) => {
    checkCountryAccessFromReqParams(req)
    repository.read(req.params.countryIso, req.params.tableSpecName)
      .then(result => res.json(result))
  })
}

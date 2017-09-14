const Promise = require('bluebird')
const db = require('../db/db')
const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {getFraValues} = require('../eof/api')
const repository = require('./growingStockRepository')

module.exports.init = app => {

  app.get('/growingStock/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)

    const fraValues = getFraValues('forestCharacteristics', req.params.countryIso)
    const growingStock = repository.readGrowingStock(req.params.countryIso)

    Promise.all([fraValues, growingStock])
      .then(result => res.json({fra: result[0].fra, values: result[1]}))
      .catch(err => sendErr(res, err))
  })

  app.post('/growingStock/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)

    db
      .transaction(repository.persistGrowingStock, [req.user, req.params.countryIso, req.body])
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })
}

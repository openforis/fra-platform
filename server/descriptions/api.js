const db = require('../db/db')
const {sendErr} = require('../requestUtils')
const repository = require('./descriptionsRepository')

module.exports.init = app => {

  app.get('/api/country/descriptions/:countryIso/:name', (req, res) =>
    db.transaction(repository.readDescriptions, [req.params.countryIso, req.params.name])
      .then(result => res.json(result))
      .catch(err => sendErr(res, err))
  )

  app.post('/api/country/descriptions/:countryIso/:name', (req, res) =>
    db.transaction(repository.persistDescriptions, [req.params.countryIso, req.params.name, req.body.content])
      .then(result => res.json({}))
      .catch(err => sendErr(res, err))
  )

}

const db = require('../db/db')
const {sendErr} = require('../requestUtils')
const repository = require('./descriptionsRepository')
const snake = require('to-snake-case')

module.exports.init = app => {

  app.get('/api/country/descriptions/:countryIso/:descField', (req, res) =>
    db.transaction(repository.readDescriptions, [req.params.countryIso, snake(req.params.descField)])
      .then(result => res.json(result))
      .catch(err => sendErr(res, err))
  )

  app.post('/api/country/descriptions/:countryIso/:descField', (req, res) =>
    db.transaction(repository.persistDescriptions, [req.params.countryIso, snake(req.params.descField), req.body.value])
      .then(result => res.json({}))
      .catch(err => sendErr(res, err))
  )

}

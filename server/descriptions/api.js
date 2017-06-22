const db = require('../db/db')
const {sendErr} = require('../requestUtils')
const repository = require('./descriptionsRepository')
const snake = require('to-snake-case')

module.exports.init = app => {

  app.get('/api/country/descriptions/:countryIso/:name', (req, res) =>
    db.transaction(repository.readDescriptions, [req.params.countryIso, snake(req.params.name)])
      .then(result => res.json(result))
      .catch(err => sendErr(res, err))
  )

  app.post('/api/country/descriptions/:countryIso/:name', (req, res) =>
    db.transaction(repository.persistDescriptions, [req.params.countryIso, snake(req.params.name), req.body.content])
      .then(result => res.json({}))
      .catch(err => sendErr(res, err))
  )

}

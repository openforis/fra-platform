const db = require('../db/db')
const repository = require('./traditionalTableRepository')
const {sendErr} = require('../requestUtils')

module.exports.init = app => {
  app.post('/api/traditionalTable/:countryIso/:tableSpecName', (req, res) => {
    db.transaction(repository.save, [req.params.countryIso, req.params.tableSpecName, req.body])
      .then(result => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/api/traditionalTable/:countryIso/:tableSpecName', (req, res) => {
    repository.read(req.params.countryIso, req.params.tableSpecName)
      .then(result => res.json(result))
  })
}

const db = require('../db/db')
const repository = require('./fraTableRepository')
const {sendErr} = require('../requestUtils')

module.exports.init = app => {
  app.post('/api/saveFraTable/:countryIso/:tableSpecName', (req, res) => {
    db.transaction(repository.save, [req.params.countryIso, req.params.tableSpecName, req.body])
      .then(result => res.json({}))
      .catch(err => sendErr(res, err))
  })
}

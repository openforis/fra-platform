const db = require('../db/db')
const {sendErr} = require('../requestUtils')

module.exports.init = app => {
  app.post('/api/saveFraTable/:countryIso/:tableSpecName', (req, res) => {
    console.log('saveFraTable')
    console.log(req.params.countryIso)
    console.log(req.params.tableSpecName)
    console.log(req.body)
    res.json({})
  })
}

const db = require('../db/db')

const {sendErr} = require('../requestUtils')

module.exports.init = app => {
  app.post('/api/login/:email', (req, res) => {
    res.json({loginStatus: 'ok', userInfo: {name: 'John Doe'}})
  })
}

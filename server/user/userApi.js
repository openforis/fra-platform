const db = require('../db/db')
const userRepository = require('./userRepository')
const {sendErr} = require('../requestUtils')

module.exports.init = app =>
  app.post('/api/login/:email', (req, res) => {
    userRepository.getUserInfo(req.params.email)
      .then(result => res.json({userInfo: result, loginStatus: result ? 'ok' : 'fail'}))
      .catch(err => sendErr(res, err))
  })

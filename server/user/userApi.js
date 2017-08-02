const db = require('../db/db')
const userRepository = require('./userRepository')
const {sendErr} = require('../utils/requestUtils')

module.exports.init = app => {

  app.get('/loggedInUser/', (req, res) => {
    const userInfo = req.user
    res.json({userInfo})
  })

  app.post('/user/lang', (req, res) => {
    db.transaction(userRepository.updateLanguage, [req.query.lang, req.session.passport.user])
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

}

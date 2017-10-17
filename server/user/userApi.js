const db = require('../db/db')
const userRepository = require('./userRepository')
const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

module.exports.init = app => {

  app.get('/loggedInUser/', (req, res) =>
    res.json({userInfo: req.user})
  )

  app.post('/user/lang', (req, res) => {
    db.transaction(userRepository.updateLanguage, [req.query.lang, req.user])
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/users/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)

    userRepository
      .fetchCountryUsers(req.params.countryIso)
      .then(users => res.json(users))
      .catch(err => sendErr(res, err))
  })

}

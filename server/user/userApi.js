const uuidv4 = require('uuid/v4')

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
      .fetchCountryUsers(req.params.countryIso, req.user)
      .then(users => res.json(users))
      .catch(err => sendErr(res, err))
  })

  app.post('/users/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const userRequest = req.body

    if (userRequest.id) {

      db.transaction(userRepository.updateUser, [req.params.countryIso, userRequest])
        .then(res.json({}))
        .catch(err => sendErr(res, err))

    } else {

      userRepository.findUserByEmail(userRequest.email)
        .then(user => {
          if (user) {
            // send email
            res.json({})

          } else {

            db.transaction(userRepository.addUser, [req.params.countryIso, userRequest, uuidv4()])
              .then(res.json({}))
              .catch(err => sendErr(res, err))

          }

        })
    }

  })

  app.delete('/users/:countryIso/:userId', (req, res) => {
    checkCountryAccessFromReqParams(req)

    db.transaction(userRepository.removeCountryUser, [req.params.countryIso, req.params.userId])
      .then(res.json({}))
      .catch(err => sendErr(res, err))
  })
}

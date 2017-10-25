const uuidv4 = require('uuid/v4')

const db = require('../db/db')
const userRepository = require('./userRepository')
const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendMail} = require('./mailManager')

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
    const countryIso = req.params.countryIso

    if (userRequest.id) {
      // update existing user
      db.transaction(userRepository.updateUser, [countryIso, userRequest])
        .then(res.json({}))
        .catch(err => sendErr(res, err))

    } else {
      const url = req.protocol + '://' + req.get('host')

      userRepository.findUserByEmail(userRequest.email)
        .then(user => {
          if (user) {
            // granting access to a country for an existing user
            sendMail(countryIso, userRequest, url)
              .then(() => res.json({}))
              .catch(err => sendErr(res, err))

          } else {
            // creating new user and granting access to a country
            const invitationUUID = uuidv4()
            db.transaction(userRepository.addUser, [countryIso, userRequest, invitationUUID])
              .then(() => {
                sendMail(countryIso, userRequest, url, invitationUUID)
                  .then(() => res.json({}))
                  .catch(err => sendErr(res, err))
              })
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

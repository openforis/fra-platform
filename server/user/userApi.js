const R = require('ramda')
const uuidv4 = require('uuid/v4')

const db = require('../db/db')
const userRepository = require('./userRepository')
const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendMail} = require('./mailManager')
const { allowedToChangeRoles } = require('../../common/userManagementAccessControl')

const filterAllowedUsers = (countryIso, user, users) => {
  const allowedRoles = allowedToChangeRoles(countryIso, user)
  return R.filter(userInList => R.contains(userInList.role, allowedRoles), users)
}

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
    const countryIso = req.params.countryIso
    userRepository
      .fetchCountryUsers(countryIso, req.user)
      .then(users => res.json(filterAllowedUsers(countryIso, req.user, users)))
      .catch(err => sendErr(res, err))
  })

  app.post('/users/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)

    const userRequest = req.body
    const countryIso = req.params.countryIso

    if (userRequest.id) {
      // update existing user
      db.transaction(userRepository.updateUser, [req.user, countryIso, userRequest])
        .then(res.json({}))
        .catch(err => sendErr(res, err))

    } else {
      const url = req.protocol + '://' + req.get('host')

      db.transaction(userRepository.addCountryUser, [req.user, countryIso, userRequest])
        .then(user =>
          user
          ? sendMail(countryIso, user, url)
            .then(() => res.json({}))
            .catch(err => sendErr(res, err))
          : res.json({})
        )
    }

  })

  app.delete('/users/:countryIso/:userId', (req, res) => {
    checkCountryAccessFromReqParams(req)

    db.transaction(userRepository.removeCountryUser, [req.user, req.params.countryIso, req.params.userId])
      .then(res.json({}))
      .catch(err => sendErr(res, err))
  })
}

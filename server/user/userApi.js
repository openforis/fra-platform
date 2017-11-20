const R = require('ramda')
const uuidv4 = require('uuid/v4')

const db = require('../db/db')
const userRepository = require('./userRepository')
const { sendErr } = require('../utils/requestUtils')
const { AccessControlException } = require('../utils/accessControl')
const { checkCountryAccessFromReqParams } = require('../utils/accessControl')
const { sendInvitation } = require('./sendInvitation')
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
      .fetchUsersAndInvitations(countryIso, req.user)
      .then(users => res.json(filterAllowedUsers(countryIso, req.user, users)))
      .catch(err => sendErr(res, err))
  })

  app.post('/users/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const userToBeChangedOrAdded = req.body
    const countryIso = req.params.countryIso

    const allowedRoles = allowedToChangeRoles(countryIso, req.user)
    if (!R.contains(userToBeChangedOrAdded.role, allowedRoles)) {
      throw new AccessControlException('error.access.roleChangeNotAllowed', {user: req.user.name, role: userToBeChangedOrAdded.role})
    }
    const url = req.protocol + '://' + req.get('host')
    if (userToBeChangedOrAdded.id) {
      // update existing user
      db.transaction(userRepository.updateUser, [req.user, countryIso, userToBeChangedOrAdded])
        .then(() => res.json({}))
        .catch(err => sendErr(res, err))
    } else if (userToBeChangedOrAdded.invitationUuid) {
      db.transaction(userRepository.updateInvitation, [req.user, countryIso, userToBeChangedOrAdded])
        .then(invitationUuid => sendInvitation(countryIso, {...userToBeChangedOrAdded, invitationUuid}, req.user, url))
        .then(() => res.json({}))
        .catch(err => sendErr(res, err))
    } else {
      db.transaction(userRepository.addInvitation, [req.user, countryIso, userToBeChangedOrAdded])
        .then(invitationUuid => sendInvitation(countryIso, {...userToBeChangedOrAdded, invitationUuid}, req.user, url))
        .then(() => res.json({}))
        .catch(err => sendErr(res, err))
    }
  })

  app.delete('/users/:countryIso/', (req, res) => {
    checkCountryAccessFromReqParams(req)
    if (req.query.id) {
      db.transaction(userRepository.removeCountryUser, [req.user, req.params.countryIso, req.query.id])
        .then(() => res.json({}))
        .catch(err => sendErr(res, err))
    } else if (req.query.invitationUuid) {
      db.transaction(userRepository.removeInvitation, [req.user, req.params.countryIso, req.query.invitationUuid])
        .then(() => res.json({}))
        .catch(err => sendErr(res, err))
    } else {
      sendErr(res, 'No id or invitationUuid given')
    }
  })
}

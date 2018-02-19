const R = require('ramda')

const db = require('../db/db')
const userRepository = require('./userRepository')
const {sendErr, sendOk, serverUrl} = require('../utils/requestUtils')
const {AccessControlException} = require('../utils/accessControl')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendInvitation} = require('./sendInvitation')
const {rolesAllowedToChange} = require('../../common/userManagementAccessControl')

const filterAllowedUsers = (countryIso, user, users) => {
  const allowedRoles = rolesAllowedToChange(countryIso, user)
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

  app.get('/users/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const countryIso = req.params.countryIso
      const users = await userRepository.fetchUsersAndInvitations(countryIso, req.user)
      res.json(filterAllowedUsers(countryIso, req.user, users))
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/users/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const userToBeChangedOrAdded = req.body
      const countryIso = req.params.countryIso

      const allowedRoles = rolesAllowedToChange(countryIso, req.user)
      if (!R.contains(userToBeChangedOrAdded.role, allowedRoles)) {
        throw new AccessControlException('error.access.roleChangeNotAllowed', {
          user: req.user.name,
          role: userToBeChangedOrAdded.role
        })
      }
      const url = serverUrl(req)
      if (userToBeChangedOrAdded.id) {
        // update existing user
        await db.transaction(userRepository.updateUser, [req.user, countryIso, userToBeChangedOrAdded])
      } else {
        const persistFunction = userToBeChangedOrAdded.invitationUuid
          ? userRepository.updateInvitation
          : userRepository.addInvitation
        const invitationUuid = await db.transaction(persistFunction, [req.user, countryIso, userToBeChangedOrAdded])
        await sendInvitation(countryIso, {
          ...userToBeChangedOrAdded,
          invitationUuid
        }, req.user, url)

      }

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.delete('/users/:countryIso/', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      if (req.query.id) {
        await db.transaction(userRepository.removeCountryUser, [req.user, req.params.countryIso, req.query.id])
      } else if (req.query.invitationUuid) {
        await db.transaction(userRepository.removeInvitation, [req.user, req.params.countryIso, req.query.invitationUuid])
      } else {
        sendErr(res, 'No id or invitationUuid given')
      }
      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })
}

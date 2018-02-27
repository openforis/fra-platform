const R = require('ramda')

const db = require('../db/db')
const userRepository = require('./userRepository')
const {sendErr, sendOk, serverUrl} = require('../utils/requestUtils')
const {AccessControlException} = require('../utils/accessControl')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendInvitation} = require('./sendInvitation')
const {rolesAllowedToChange} = require('../../common/userManagementAccessControl')

const {isAdministrator, isNationalCorrespondent, isCollaborator} = require('../../common/countryRole')
const {validate: validateUser} = require('../../common/userUtils')

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

  app.get('/users/:countryIso/user/edit/:userId', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const user = await userRepository.findUserById(req.params.userId)

      res.json({user})

    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/users/:countryIso/user/:userId/profilePicture', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const profilePictureFile = await userRepository.getUserProfilePicture(req.params.userId)

      profilePictureFile
        ? res.end(profilePictureFile, 'binary')
        : res.sendFile(`${__dirname}/avatar.png`)

    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/users/:countryIso/user/edit/', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const user = req.user
      const userToUpdate = JSON.parse(req.body.user)
      const countryIso = req.params.countryIso


      if (isAdministrator(user)
        || user.id === userToUpdate.id
        || (isNationalCorrespondent(countryIso, user) && isCollaborator(countryIso, userToUpdate))
      ) {

        const validation = validateUser(userToUpdate)
        if (validation.valid) {
          const profilePictureFile = R.pipe(
            R.path(['files', 'profilePicture']),
            R.defaultTo({data: null, name: null})
          )(req)

          await db.transaction(userRepository.updateUser, [req.user, countryIso, userToUpdate, profilePictureFile])

          sendOk(res)
        } else {
          sendErr(res, {msg: 'Invalid User', ...validation})
        }

      } else {
        sendErr(res, 'Operation not allowed')
      }

    } catch (err) {
      sendErr(res, err)
    }
  })

}

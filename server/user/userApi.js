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

  // get session user
  app.get('/loggedInUser/', (req, res) =>
    res.json({userInfo: req.user})
  )

  // update session user language
  app.post('/user/lang', (req, res) => {
    db.transaction(userRepository.updateLanguage, [req.query.lang, req.user])
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  // get users and invitations list
  app.get('/users/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const countryIso = req.params.countryIso
      const allCountryUsers = await userRepository.fetchUsersAndInvitations(countryIso, req.user)
      const countryUsers = filterAllowedUsers(countryIso, req.user, allCountryUsers)

      const allUsers = isAdministrator(req.user)
        ? await userRepository.fetchAllUsersAndInvitations(req.params.countryIso)
        : []

      res.json({countryUsers, allUsers})
    } catch (err) {
      sendErr(res, err)
    }
  })

  // add new user
  app.post('/users/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const newUser = req.body
      const countryIso = req.params.countryIso

      const allowedRoles = rolesAllowedToChange(countryIso, req.user)
      if (!R.contains(newUser.role, allowedRoles)) {
        throw new AccessControlException('error.access.roleChangeNotAllowed', {
          user: req.user.name,
          role: newUser.role
        })
      }

      const persistFunction = newUser.invitationUuid
        ? userRepository.updateInvitation
        : userRepository.addInvitation

      const url = serverUrl(req)
      const invitationUuid = await db.transaction(persistFunction, [req.user, countryIso, newUser])
      await sendInvitation(countryIso, {
        ...newUser,
        invitationUuid
      }, req.user, url)

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  // remove user
  app.delete('/users/:countryIso/', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      if (req.query.id) {
        await db.transaction(userRepository.removeUser, [req.user, req.params.countryIso, req.query.id])
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

  // get user for editing page
  app.get('/users/:countryIso/user/edit/:userId', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const user = await userRepository.findUserById(req.params.userId)

      res.json({user})

    } catch (err) {
      sendErr(res, err)
    }
  })

  // get user profile picture
  app.get('/users/:countryIso/user/:userId/profilePicture', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const profilePicture = await userRepository.getUserProfilePicture(req.params.userId)

      profilePicture && profilePicture.data
        ? res.end(profilePicture.data, 'binary')
        : res.sendFile(`${__dirname}/avatar.png`)

    } catch (err) {
      sendErr(res, err)
    }
  })

  // update user
  app.post('/users/:countryIso/user/edit/', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const user = req.user
      const userToUpdate = JSON.parse(req.body.user)
      const countryIso = req.params.countryIso

      // checking permission to edit user
      if (
        isAdministrator(user)
        || user.id === userToUpdate.id
        || (isNationalCorrespondent(countryIso, user) && isCollaborator(countryIso, userToUpdate))
      ) {
        const validation = validateUser(userToUpdate)
        if (validation.valid) {
          const profilePicture = await userRepository.getUserProfilePicture(userToUpdate.id)

          const profilePictureFile = R.pipe(
            R.path(['files', 'profilePicture']),
            R.defaultTo({data: profilePicture.data, name: profilePicture.name})
          )(req)

          await db.transaction(userRepository.updateUser, [user, countryIso, userToUpdate, profilePictureFile])

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

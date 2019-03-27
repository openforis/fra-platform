const R = require('ramda')
const Promise = require('bluebird')

const db = require('../db/db')
const userRepository = require('./userRepository')
const { sendErr, sendOk, serverUrl, send404 } = require('../utils/requestUtils')

const { AccessControlException, checkCountryAccessFromReqParams } = require('../utils/accessControl')
const { sendInvitation } = require('./sendInvitation')
const { rolesAllowedToChange } = require('../../common/userManagementAccessControl')

const { isAdministrator, isNationalCorrespondent, isCollaborator, isAlternateNationalCorrespondent, getCountryRole, reviewer } = require('../../common/countryRole')
const { validate: validateUser, validEmail } = require('../../common/userUtils')

const filterAllowedUsers = (countryIso, user, users) => {
  const allowedRoles = rolesAllowedToChange(countryIso, user)
  return R.filter(userInList => R.contains(userInList.role, allowedRoles), users)
}

module.exports.init = app => {

  // get session user
  app.get('/loggedInUser/', (req, res) =>
    res.json({ userInfo: req.user })
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

      const { countryIso } = req.params
      const print = req.query.print === 'true'
      const url = serverUrl(req)

      const allCountryUsers = await userRepository.fetchUsersAndInvitations(countryIso, url)

      const countryUsers = print
        ? R.reject(
          user => R.propEq('role', reviewer.role, user) || R.equals(R.toLower(user.email), 'lucilla.marinaro@fao.org'),
          allCountryUsers
        )
        : filterAllowedUsers(countryIso, req.user, allCountryUsers)

      res.json({ countryUsers })
    } catch (err) {
      sendErr(res, err)
    }
  })

  // get all users / only admin can access it
  app.get('/users', async (req, res) => {
    try {
      if (isAdministrator(req.user)) {
        const url = serverUrl(req)

        const allUsers = await userRepository.fetchAllUsersAndInvitations(url)
        const userCounts = await userRepository.getUserCountsByRole()

        res.json({ allUsers, userCounts })
      } else {
        send404(res)
      }
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

      const user = await userRepository.findUserByEmail(newUser.email)
      let invitationUuid = null

      // EXISTING USER
      if (user) {
        const countryRole = getCountryRole(countryIso, user)

        if (countryRole) {
          // User already added to country
          throw new AccessControlException(
            'error.access.userAlreadyAddedToCountry',
            { user: user.name + ' (' + user.email + ')', countryIso }
          )
        } else {
          // adding country to user
          const profilePicture = await userRepository.getUserProfilePicture(user.id)
          const rolesUpdated = R.append({ countryIso, role: newUser.role }, user.roles)
          await db.transaction(userRepository.updateUser, [req.user, countryIso, R.assoc('roles', rolesUpdated, user), profilePicture])
        }

        // NEW USER
      } else {

        const persistFunction = newUser.invitationUuid
          ? userRepository.updateInvitation
          : userRepository.addInvitation

        invitationUuid = await db.transaction(persistFunction, [req.user, countryIso, newUser])
      }

      const url = serverUrl(req)
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

      res.json({ user })

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
        || (
          (isNationalCorrespondent(countryIso, user) || isAlternateNationalCorrespondent(countryIso, userToUpdate)) &&
          isCollaborator(countryIso, userToUpdate)
        )
      ) {
        const validation = validateUser(userToUpdate)
        if (validation.valid) {
          const profilePicture = await userRepository.getUserProfilePicture(userToUpdate.id)

          const profilePictureFile = R.pipe(
            R.path(['files', 'profilePicture']),
            R.defaultTo({ data: profilePicture.data, name: profilePicture.name })
          )(req)

          await db.transaction(userRepository.updateUser, [user, countryIso, userToUpdate, profilePictureFile])

          sendOk(res)
        } else {
          sendErr(res, { msg: 'Invalid User', ...validation })
        }

      } else {
        sendErr(res, 'Operation not allowed')
      }

    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/users/:countryIso/invitations/:invitationUuid/send', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const url = serverUrl(req)

      const invitation = await userRepository.fetchInvitation(req.params.invitationUuid, url)

      if (invitation)
        await sendInvitation(invitation.countryIso, invitation, req.user, url)

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/users/invitations/send', async (req, res) => {
    try {
      if (isAdministrator(req.user)) {
        const url = serverUrl(req)

        const invitations = await userRepository.fetchAllInvitations(url)
        const sendInvitationPromises = invitations.map(async invitation => {

          if (validEmail(invitation)) {
            await sendInvitation(invitation.countryIso, invitation, req.user, url)
            return `<p>Email sent to ${invitation.name} (${invitation.email}) invited as ${invitation.role} for ${invitation.countryIso}</p>`

          } else {
            return `<p style="color:red">Email could not be sent to ${invitation.name} (${invitation.email}) invited as ${invitation.role} for ${invitation.countryIso}</p>`
          }

        })

        const sendInvitations = await Promise.all(sendInvitationPromises)

        res.send(sendInvitations.join('<br/><br/>'))

      } else {
        res.status(404).send('404 / Page not found')
      }

    } catch (err) {
      sendErr(res, err)
    }
  })

}

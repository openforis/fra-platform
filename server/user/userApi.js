const R = require('ramda')
const Promise = require('bluebird')

const db = require('../db/db')
const userRepository = require('./userRepository')
const Request = require('../utils/requestUtils')

const { AccessControlException } = require('../utils/accessControl')
const { sendInvitation } = require('./sendInvitation')
const { rolesAllowedToChange } = require('../../common/userManagementAccessControl')

const {
  isAdministrator,
  isNationalCorrespondent,
  isCollaborator,
  isAlternateNationalCorrespondent,
  getCountryRole,
  reviewer,
} = require('../../common/countryRole')
const { validate: validateUser, validEmail } = require('../../common/userUtils')

const Auth = require('../auth/authApiMiddleware')

const filterAllowedUsers = (countryIso, user, users) => {
  const allowedRoles = rolesAllowedToChange(countryIso, user)
  return R.filter((userInList) => R.contains(userInList.role, allowedRoles), users)
}

module.exports.init = (app) => {
  // get session user
  app.get('/loggedInUser/', (req, res) => res.json({ userInfo: req.user }))

  // update session user language
  app.post('/user/lang', (req, res) => {
    db.transaction(userRepository.updateLanguage, [req.query.lang, req.user])
      .then(() => res.json({}))
      .catch((err) => Request.sendErr(res, err))
  })

  // get users and invitations list
  app.get('/users/:countryIso', async (req, res) => {
    try {
      const { countryIso } = req.params
      const print = req.query.print === 'true'
      const url = Request.serverUrl(req)

      const allCountryUsers = await userRepository.fetchUsersAndInvitations(countryIso, url)

      const fraReportCollaboratorsExcluded = R.pathOr([], ['env', 'FRA_REPORT_COLLABORATORS_EXCLUDED'])(process)

      const countryUsers = print
        ? R.reject(
            (user) =>
              R.propEq('role', reviewer.role, user) ||
              R.contains(R.toLower(user.email), fraReportCollaboratorsExcluded),
            allCountryUsers
          )
        : filterAllowedUsers(countryIso, req.user, allCountryUsers)

      res.json({ countryUsers })
    } catch (err) {
      Request.sendErr(res, err)
    }
  })

  // get all users / only admin can access it
  app.get('/users', Auth.requireAdminPermission, async (req, res) => {
    try {
      const url = Request.serverUrl(req)
      const allUsers = await userRepository.fetchAllUsersAndInvitations(url)
      const userCounts = await userRepository.getUserCountsByRole()
      res.json({ allUsers, userCounts })
    } catch (err) {
      Request.sendErr(res, err)
    }
  })

  // add new user
  app.post('/users/:countryIso', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const newUser = req.body
      const countryIso = req.params.countryIso

      const allowedRoles = rolesAllowedToChange(countryIso, req.user)
      if (!R.contains(newUser.role, allowedRoles)) {
        throw new AccessControlException('error.access.roleChangeNotAllowed', {
          user: req.user.name,
          role: newUser.role,
        })
      }

      const user = await userRepository.findUserByEmail(newUser.email)
      let invitationUuid = null

      // EXISTING USER
      if (user) {
        const countryRole = getCountryRole(countryIso, user)

        if (countryRole) {
          // User already added to country
          throw new AccessControlException('error.access.userAlreadyAddedToCountry', {
            user: user.name + ' (' + user.email + ')',
            countryIso,
          })
        } else {
          // adding country to user
          const profilePicture = await userRepository.getUserProfilePicture(user.id)
          const rolesUpdated = R.append({ countryIso, role: newUser.role }, user.roles)
          await db.transaction(userRepository.updateUser, [
            req.user,
            countryIso,
            R.assoc('roles', rolesUpdated, user),
            profilePicture,
            true,
          ])
        }

        // NEW USER
      } else {
        const persistFunction = newUser.invitationUuid ? userRepository.updateInvitation : userRepository.addInvitation

        invitationUuid = await db.transaction(persistFunction, [req.user, countryIso, newUser])
      }

      const url = Request.serverUrl(req)
      await sendInvitation(
        countryIso,
        {
          ...newUser,
          invitationUuid,
        },
        req.user,
        url
      )

      Request.sendOk(res)
    } catch (err) {
      Request.sendErr(res, err)
    }
  })

  // remove user
  app.delete('/users/:countryIso/', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      if (req.query.id) {
        await db.transaction(userRepository.removeUser, [req.user, req.params.countryIso, req.query.id])
      } else if (req.query.invitationUuid) {
        await db.transaction(userRepository.removeInvitation, [
          req.user,
          req.params.countryIso,
          req.query.invitationUuid,
        ])
      } else {
        Request.sendErr(res, 'No id or invitationUuid given')
      }
      Request.sendOk(res)
    } catch (err) {
      Request.sendErr(res, err)
    }
  })

  // get user
  app.get('/users/user/:userId', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const user = await userRepository.findUserById(req.params.userId)

      res.json({ user })
    } catch (err) {
      Request.sendErr(res, err)
    }
  })

  // get user profile picture
  app.get('/users/user/:userId/profilePicture/', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const profilePicture = await userRepository.getUserProfilePicture(req.params.userId)

      if (profilePicture && profilePicture.data) {
        res.end(profilePicture.data, 'binary')
      } else {
        res.sendFile(`${__dirname}/avatar.png`)
      }
    } catch (err) {
      Request.sendErr(res, err)
    }
  })

  // update user
  app.post('/users/:countryIso/user/edit/', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const user = req.user
      const userToUpdate = JSON.parse(req.body.user)
      const countryIso = req.params.countryIso
      const editingSelf = user.id === userToUpdate.id

      // checking permission to edit user
      if (
        isAdministrator(user) ||
        editingSelf ||
        ((isNationalCorrespondent(countryIso, user) || isAlternateNationalCorrespondent(countryIso, userToUpdate)) &&
          isCollaborator(countryIso, userToUpdate))
      ) {
        const validation = validateUser(userToUpdate)
        if (validation.valid) {
          const profilePicture = await userRepository.getUserProfilePicture(userToUpdate.id)

          const profilePictureFile = R.pipe(
            R.path(['files', 'profilePicture']),
            R.defaultTo({ data: profilePicture.data, name: profilePicture.name })
          )(req)

          await db.transaction(userRepository.updateUser, [user, countryIso, userToUpdate, profilePictureFile, !editingSelf])

          Request.sendOk(res)
        } else {
          Request.sendErr(res, { msg: 'Invalid User', ...validation })
        }
      } else {
        Request.sendErr(res, 'Operation not allowed')
      }
    } catch (err) {
      Request.sendErr(res, err)
    }
  })

  app.get(
    '/users/:countryIso/invitations/:invitationUuid/send',
    Auth.requireCountryEditPermission,
    async (req, res) => {
      try {
        const url = Request.serverUrl(req)

        const invitation = await userRepository.fetchInvitation(req.params.invitationUuid, url)

        if (invitation) await sendInvitation(invitation.countryIso, invitation, req.user, url)

        Request.sendOk(res)
      } catch (err) {
        Request.sendErr(res, err)
      }
    }
  )

  app.get('/users/invitations/send', Auth.requireAdminPermission, async (req, res) => {
    try {
      const url = Request.serverUrl(req)

      const invitations = await userRepository.fetchAllInvitations(url)
      const sendInvitationPromises = invitations.map(async (invitation) => {
        if (validEmail(invitation)) {
          await sendInvitation(invitation.countryIso, invitation, req.user, url)
          return `<p>Email sent to ${invitation.name} (${invitation.email}) invited as ${invitation.role} for ${invitation.countryIso}</p>`
        } else {
          return `<p style="color:red">Email could not be sent to ${invitation.name} (${invitation.email}) invited as ${invitation.role} for ${invitation.countryIso}</p>`
        }
      })

      const sendInvitations = await Promise.all(sendInvitationPromises)

      res.send(sendInvitations.join('<br/><br/>'))
    } catch (error) {
      Request.sendErr(res, error)
    }
  })
}

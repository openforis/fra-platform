import * as R from 'ramda'

import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '../db/db'
import * as userRepository from './userRepository'
import * as Request from '../utils/requestUtils'
import { AccessControlException } from '../utils/accessControl'
import { sendInvitation } from './sendInvitation'
import { rolesAllowedToChange } from '../../common/userManagementAccessControl'
import {
  isAdministrator,
  isNationalCorrespondent,
  isCollaborator,
  isAlternateNationalCorrespondent,
  getCountryRole,
  reviewer,
} from '../../common/countryRole'
import { validate as validateUser, validEmail } from '../../common/userUtils'

const filterAllowedUsers = (countryIso: any, user: any, users: any) => {
  const allowedRoles = rolesAllowedToChange(countryIso, user)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return R.filter((userInList: any) => R.contains(userInList.role, allowedRoles), users)
}
export const init = (app: any) => {
  // get session user
  app.get('/loggedInUser/', (req: any, res: any) => res.json({ userInfo: req.user }))
  // update session user language
  app.post('/user/lang', (req: any, res: any) => {
    db.transaction(userRepository.updateLanguage, [req.query.lang, req.user])
      .then(() => res.json({}))
      .catch((err: any) => (Request as any).sendErr(res, err))
  })
  // get users and invitations list
  app.get('/users/:countryIso', async (req: any, res: any) => {
    try {
      const { countryIso } = req.params
      const print = req.query.print === 'true'
      const url = (Request as any).serverUrl(req)
      const allCountryUsers = await userRepository.fetchUsersAndInvitations(countryIso, url)
      const fraReportCollaboratorsExcluded = R.pathOr([], ['env', 'FRA_REPORT_COLLABORATORS_EXCLUDED'])(process)
      const countryUsers = print
        ? R.reject(
            (user: any) =>
              R.propEq('role', reviewer.role, user) ||
              R.contains(R.toLower(user.email), fraReportCollaboratorsExcluded),
            allCountryUsers
          )
        : filterAllowedUsers(countryIso, req.user, allCountryUsers)
      res.json({ countryUsers })
    } catch (err) {
      ;(Request as any).sendErr(res, err)
    }
  })
  // get all users / only admin can access it
  app.get('/users', ApiAuthMiddleware.requireAdminPermission, async (req: any, res: any) => {
    try {
      const url = (Request as any).serverUrl(req)
      const allUsers = await userRepository.fetchAllUsersAndInvitations(url)
      const userCounts = await userRepository.getUserCountsByRole()
      res.json({ allUsers, userCounts })
    } catch (err) {
      ;(Request as any).sendErr(res, err)
    }
  })
  // add new user
  app.post('/users/:countryIso', ApiAuthMiddleware.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      const newUser = req.body
      const { countryIso } = req.params
      const allowedRoles = rolesAllowedToChange(countryIso, req.user)
      if (!R.contains(newUser.role, allowedRoles)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          throw new AccessControlException('error.access.userAlreadyAddedToCountry', {
            user: `${user.name} (${user.email})`,
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
      const url = (Request as any).serverUrl(req)
      await sendInvitation(
        countryIso,
        {
          ...newUser,
          invitationUuid,
        },
        req.user,
        url
      )
      ;(Request as any).sendOk(res)
    } catch (err) {
      ;(Request as any).sendErr(res, err)
    }
  })
  // remove user
  app.delete('/users/:countryIso/', ApiAuthMiddleware.requireCountryEditPermission, async (req: any, res: any) => {
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
        ;(Request as any).sendErr(res, 'No id or invitationUuid given')
      }
      ;(Request as any).sendOk(res)
    } catch (err) {
      ;(Request as any).sendErr(res, err)
    }
  })
  // get user
  app.get('/users/user/:userId', ApiAuthMiddleware.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      const user = await userRepository.findUserById(req.params.userId)
      res.json({ user })
    } catch (err) {
      ;(Request as any).sendErr(res, err)
    }
  })
  // get user profile picture
  app.get(
    '/users/user/:userId/profilePicture/',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const profilePicture = await userRepository.getUserProfilePicture(req.params.userId)
        if (profilePicture && profilePicture.data) {
          res.end(profilePicture.data, 'binary')
        } else {
          res.sendFile(`${__dirname}/../static/avatar.png`)
        }
      } catch (err) {
        ;(Request as any).sendErr(res, err)
      }
    }
  )
  // update user
  app.put('/users/user/', ApiAuthMiddleware.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      const { user } = req
      const countryIso = JSON.parse(req.body.countryIso)
      const userToUpdate = JSON.parse(req.body.user)
      let withCountryIso = false
      if (countryIso) {
        withCountryIso =
          (isNationalCorrespondent(countryIso, user) || isAlternateNationalCorrespondent(countryIso, userToUpdate)) &&
          isCollaborator(countryIso, userToUpdate)
      }
      const editingSelf = user.id === userToUpdate.id
      // checking permission to edit user
      if (isAdministrator(user) || editingSelf || withCountryIso) {
        const validation = validateUser(userToUpdate)
        if (validation.valid) {
          const profilePicture = await userRepository.getUserProfilePicture(userToUpdate.id)
          const profilePictureFile = R.pipe(
            R.path(['files', 'profilePicture']),
            R.defaultTo({ data: profilePicture.data, name: profilePicture.name })
          )(req)
          await db.transaction(userRepository.updateUser, [
            user,
            countryIso,
            userToUpdate,
            profilePictureFile,
            !editingSelf,
          ])
          ;(Request as any).sendOk(res)
        } else {
          ;(Request as any).sendErr(res, { msg: 'Invalid User', ...validation })
        }
      } else {
        ;(Request as any).sendErr(res, 'Operation not allowed')
      }
    } catch (err) {
      ;(Request as any).sendErr(res, err)
    }
  })
  app.get(
    '/users/:countryIso/invitations/:invitationUuid/send',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const url = (Request as any).serverUrl(req)
        const invitation = await userRepository.fetchInvitation(req.params.invitationUuid, url)
        if (invitation) await sendInvitation(invitation.countryIso, invitation, req.user, url)
        ;(Request as any).sendOk(res)
      } catch (err) {
        ;(Request as any).sendErr(res, err)
      }
    }
  )
  app.get('/users/invitations/send', ApiAuthMiddleware.requireAdminPermission, async (req: any, res: any) => {
    try {
      const url = (Request as any).serverUrl(req)
      const invitations = await userRepository.fetchAllInvitations(url)
      const sendInvitationPromises = invitations.map(async (invitation: any) => {
        if (validEmail(invitation)) {
          await sendInvitation(invitation.countryIso, invitation, req.user, url)
          return `<p>Email sent to ${invitation.name} (${invitation.email}) invited as ${invitation.role} for ${invitation.countryIso}</p>`
        }

        return `<p style="color:#ff0000">Email could not be sent to ${invitation.name} (${invitation.email}) invited as ${invitation.role} for ${invitation.countryIso}</p>`
      })
      const sendInvitations = await Promise.all(sendInvitationPromises)
      res.send(sendInvitations.join('<br/><br/>'))
    } catch (error) {
      ;(Request as any).sendErr(res, error)
    }
  })
}

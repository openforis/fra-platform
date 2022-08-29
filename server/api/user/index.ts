import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { AuthMiddleware } from '@server/middleware/auth'

import { acceptInvitation } from './acceptInvitation'
import { getInvitation } from './getInvitation'
import { getMany } from './getMany'
import { getProfilePicture } from './getProfilePicture'
import { getUser } from './getUser'
import { invite } from './invite'
import { removeInvitation } from './removeInvitation'
import { sendInvitationEmail } from './sendInvitationEmail'
import { updateSectionAuth } from './updateSectionAuth'
import { updateUser } from './updateUser'
import multer = require('multer')

export const UserApi = {
  init: (express: Express): void => {
    express.put(ApiEndPoint.User.many(), multer().single('profilePicture'), AuthMiddleware.requireEditUser, updateUser)
    express.get(ApiEndPoint.User.many(), AuthMiddleware.requireView, getMany)

    express.get(ApiEndPoint.User.one(), AuthMiddleware.requireEditUser, getUser)

    // Invitation
    express.post(ApiEndPoint.User.invite(), AuthMiddleware.requireEditUser, invite)

    express.get(ApiEndPoint.User.invitation(), getInvitation)
    express.delete(ApiEndPoint.User.invitation(), AuthMiddleware.requireEditUser, removeInvitation)
    express.get(ApiEndPoint.User.invitationAccept(), acceptInvitation)
    express.get(ApiEndPoint.User.invitationSendEmail(), AuthMiddleware.requireEditUser, sendInvitationEmail)

    express.get(ApiEndPoint.User.profilePicture(), getProfilePicture)
    express.post(ApiEndPoint.User.sectionAuth(), AuthMiddleware.requireEditUser, updateSectionAuth)
  },
}

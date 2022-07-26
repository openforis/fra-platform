import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { AuthMiddleware } from '@server/middleware/auth'

import { getAcceptInvitation } from './acceptInvitation'
import { getInvitation } from './getInvitation'
import { getMany } from './getMany'
import { getProfilePicture } from './getProfilePicture'
import { invite } from './invite'
import { removeInvitation } from './removeInvitation'
import { sendInvitationEmail } from './sendInvitationEmail'
import { updateUser } from './updateUser'

import multer = require('multer')

export const UserApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.User.getByInvitation(), getInvitation)
    express.get(ApiEndPoint.User.acceptInvitation(), getAcceptInvitation)
    express.get(ApiEndPoint.User.getProfilePicture(), getProfilePicture)
    express.get(ApiEndPoint.User.many(), AuthMiddleware.requireViewUsers, getMany)
    express.post(ApiEndPoint.User.invite(), AuthMiddleware.requireInviteUser, invite)
    express.delete(ApiEndPoint.User.removeInvitation(), AuthMiddleware.requireInviteUser, removeInvitation)
    express.get(ApiEndPoint.User.sendInvitationEmail(), AuthMiddleware.requireInviteUser, sendInvitationEmail)
    express.put(ApiEndPoint.User.one(), multer().single('profilePicture'), updateUser)
  },
}

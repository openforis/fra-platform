import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { AuthMiddleware } from '@server/middleware/auth'

import { getAcceptInvitation } from './acceptInvitation'
import { getInvitation } from './getInvitation'
import { getMany } from './getMany'
import { getProfilePicture } from './getProfilePicture'
import { getUser } from './getUser'
import { invite } from './invite'
import { removeInvitation } from './removeInvitation'
import { sendInvitationEmail } from './sendInvitationEmail'
import { updateTableAccess } from './updateTableAccess'
import { updateUser } from './updateUser'

import multer = require('multer')

export const UserApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.User.getByInvitation(), getInvitation)
    express.get(ApiEndPoint.User.acceptInvitation(), getAcceptInvitation)
    express.get(ApiEndPoint.User.getProfilePicture(), getProfilePicture)
    express.get(ApiEndPoint.User.many(), AuthMiddleware.requireViewUsers, getMany)
    express.post(ApiEndPoint.User.invite(), AuthMiddleware.requireEditUser, invite)
    express.post(ApiEndPoint.User.tableAccess(), AuthMiddleware.requireEditUser, updateTableAccess)
    express.delete(ApiEndPoint.User.removeInvitation(), AuthMiddleware.requireEditUser, removeInvitation)
    express.get(ApiEndPoint.User.sendInvitationEmail(), AuthMiddleware.requireEditUser, sendInvitationEmail)
    express.put(ApiEndPoint.User.many(), multer().single('profilePicture'), AuthMiddleware.requireEditUser, updateUser)
    express.get(ApiEndPoint.User.get(), AuthMiddleware.requireEditUser, getUser)
  },
}

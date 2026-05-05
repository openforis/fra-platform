import { Express } from 'express'
import multer from 'multer'

import { ApiEndPoint } from 'meta/api/endpoint'

import { AuthMiddleware } from 'server/middleware/auth'
import { FormDataBodyMiddleware } from 'server/middleware/formDataBodyMiddleware'

import { acceptInvitation } from './acceptInvitation'
import { exportUsers } from './exportUsers'
import { getCount } from './getCount'
import { getInvitation } from './getInvitation'
import { getMany } from './getMany'
import { getProfilePicture } from './getProfilePicture'
import { getResetPassword } from './getResetPassword'
import { getUser } from './getUser'
import { invite } from './invite'
import { removeInvitation } from './removeInvitation'
import { removeRole } from './removeRole'
import { sendInvitationEmail } from './sendInvitationEmail'
import { updateUser } from './updateUser'

export const UserApi = {
  init: (express: Express): void => {
    express.put(
      ApiEndPoint.User.one(),
      multer().single('profilePicture'),
      FormDataBodyMiddleware.parseBody,
      AuthMiddleware.requireEditUser,
      updateUser
    )
    express.get(ApiEndPoint.User.many(), AuthMiddleware.requireViewUsers, getMany)
    express.get(ApiEndPoint.User.manyCount(), AuthMiddleware.requireViewUsers, getCount)
    express.get(ApiEndPoint.User.manyExport(), AuthMiddleware.requireExportUsers, exportUsers)
    express.get(ApiEndPoint.User.one(), AuthMiddleware.requireViewUser, getUser)

    express.delete(ApiEndPoint.User.role(), AuthMiddleware.requireRemoveUserRole, removeRole)
    express.delete(ApiEndPoint.User.invitation(), AuthMiddleware.requireInviteUser, removeInvitation)
    express.get(ApiEndPoint.User.invitation(), getInvitation)
    express.post(
      ApiEndPoint.User.invitationAccept(),
      multer().none(),
      FormDataBodyMiddleware.parseBody,
      acceptInvitation
    )
    express.get(ApiEndPoint.User.invitationSendEmail(), AuthMiddleware.requireInviteUser, sendInvitationEmail)
    express.post(
      ApiEndPoint.User.invite(),
      multer().none(),
      FormDataBodyMiddleware.parseBody,
      AuthMiddleware.requireInviteUser,
      invite
    )

    express.get(ApiEndPoint.User.resetPassword(), getResetPassword)

    express.get(ApiEndPoint.User.profilePicture(), getProfilePicture)
  },
}

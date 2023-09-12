import { Express } from 'express'
import * as multer from 'multer'

import { ApiEndPoint } from 'meta/api/endpoint'

import { AuthMiddleware } from 'server/middleware/auth'

import { acceptInvitation } from './acceptInvitation'
import { getInvitation } from './getInvitation'
import { getMany } from './getMany'
import { getProfilePicture } from './getProfilePicture'
import { getResetPassword } from './getResetPassword'
import { getUser } from './getUser'
import { invite } from './invite'
import { removeInvitation } from './removeInvitation'
import { sendInvitationEmail } from './sendInvitationEmail'
import { updateRoleProps } from './updateRoleProps'
import { updateSectionAuth } from './updateSectionAuth'
import { updateUser } from './updateUser'
import { updateUserAdminRole } from './updateUserAdminRole'
import { updateUserRoles } from './updateUserRoles'

export const UserApi = {
  init: (express: Express): void => {
    express.put(ApiEndPoint.User.many(), multer().single('profilePicture'), AuthMiddleware.requireEditUser, updateUser)
    express.get(ApiEndPoint.User.many(), AuthMiddleware.requireViewUsers, getMany)
    express.get(ApiEndPoint.User.one(), AuthMiddleware.requireViewUser, getUser)

    express.post(ApiEndPoint.User.invite(), AuthMiddleware.requireInviteUser, invite)
    express.get(ApiEndPoint.User.invitation(), getInvitation)
    express.delete(ApiEndPoint.User.invitation(), AuthMiddleware.requireInviteUser, removeInvitation)
    express.get(ApiEndPoint.User.invitationAccept(), acceptInvitation)
    express.get(ApiEndPoint.User.invitationSendEmail(), AuthMiddleware.requireInviteUser, sendInvitationEmail)

    express.get(ApiEndPoint.User.resetPassword(), getResetPassword)

    express.get(ApiEndPoint.User.profilePicture(), getProfilePicture)

    express.post(ApiEndPoint.User.roles(), AuthMiddleware.requireAdmin, updateUserRoles)
    express.post(ApiEndPoint.User.adminRole(), AuthMiddleware.requireAdmin, updateUserAdminRole)
    express.post(ApiEndPoint.User.sectionAuth(), AuthMiddleware.requireInviteUser, updateSectionAuth)
    express.post(ApiEndPoint.User.roleProps(), AuthMiddleware.requireEditUser, updateRoleProps)
  },
}

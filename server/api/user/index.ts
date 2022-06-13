import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { AuthMiddleware } from '@server/middleware/auth'

import { getAcceptInvitation } from './acceptInvitation'
import { getInvitation } from './getInvitation'
import { getMany } from './getMany'
import { getProfilePicture } from './getProfilePicture'
import { invite } from './invite'

export const UserApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.User.getByInvitation(), getInvitation)
    express.get(ApiEndPoint.User.acceptInvitation(), getAcceptInvitation)
    express.get(ApiEndPoint.User.getProfilePicture(), getProfilePicture)
    express.get(ApiEndPoint.User.many(), AuthMiddleware.requireViewUsers, getMany)
    express.post(ApiEndPoint.User.invite(), AuthMiddleware.requireInviteUser, invite)
  },
}

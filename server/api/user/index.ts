import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { getAcceptInvitation } from './acceptInvitation'
import { getInvitation } from './getInvitation'
import { getProfilePicture } from './getProfilePicture'
import { getUsers } from './getUsers'

export const UserApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.User.getByInvitation(), getInvitation)
    express.get(ApiEndPoint.User.acceptInvitation(), getAcceptInvitation)
    express.get(ApiEndPoint.User.getProfilePicture(), getProfilePicture)
    express.get(ApiEndPoint.User.many(), getUsers)
  },
}

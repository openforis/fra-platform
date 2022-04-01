import { Express } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { getInvitation } from './getInvitation'
import { getAcceptInvitation } from './acceptInvitation'
import { getProfilePicture } from './getProfilePicture'

export const UserApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.User.getByInvitation(), getInvitation)
    express.get(ApiEndPoint.User.acceptInvitation(), getAcceptInvitation)
    express.get(ApiEndPoint.User.getProfilePicture(), getProfilePicture)
  },
}

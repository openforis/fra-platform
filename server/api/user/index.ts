import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { getAcceptInvitation } from './acceptInvitation'
import { getByCountry } from './getByCountry'
import { getInvitation } from './getInvitation'
import { getProfilePicture } from './getProfilePicture'

export const UserApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.User.getByInvitation(), getInvitation)
    express.get(ApiEndPoint.User.acceptInvitation(), getAcceptInvitation)
    express.get(ApiEndPoint.User.getProfilePicture(), getProfilePicture)
    express.get(ApiEndPoint.User.getByCountry(), getByCountry)
  },
}

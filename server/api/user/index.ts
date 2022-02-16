import { Express } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { getInvitation } from './getInvitation'
import { UserAcceptInvitation } from './acceptInvitation'

export const UserApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.User.getByInvitation(), getInvitation)
    UserAcceptInvitation.init(express)
  },
}

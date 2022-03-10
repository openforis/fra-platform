import { Express } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { getInvitation } from './getInvitation'
import { getAcceptInvitation } from './acceptInvitation'

export const UserApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.User.getByInvitation(), getInvitation)
    express.get(ApiEndPoint.User.acceptInvitation(), getAcceptInvitation)
  },
}

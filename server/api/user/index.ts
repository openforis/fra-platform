import { Express } from 'express'
import { UserGetByInvitation } from './getByInvitation'
import { UserAcceptInvitation } from './acceptInvitation'

export const UserApi = {
  init: (express: Express): void => {
    UserGetByInvitation.init(express)
    UserAcceptInvitation.init(express)
  },
}

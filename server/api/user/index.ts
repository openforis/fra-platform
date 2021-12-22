import { Express } from 'express'
import { UserGetByInvitation } from './getByInvitation'

export const UserApi = {
  init: (express: Express): void => {
    UserGetByInvitation.init(express)
  },
}

import { Express } from 'express'
import { UserChatCreate } from '@server/api/userChat/create'
import { UserChatGetAll } from '@server/api/userChat/getAll'
import { UserChatGetNew } from '@server/api/userChat/getNew'

export const UserChatApi = {
  init: (express: Express): void => {
    UserChatCreate.init(express)
    UserChatGetAll.init(express)
    UserChatGetNew.init(express)
  },
}

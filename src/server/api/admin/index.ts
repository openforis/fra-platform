import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { AuthMiddleware } from 'server/middleware/auth'

import { getUsers } from './getUsers'
import { getUsersCount } from './getUsersCount'

export const AdminApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Admin.users(), AuthMiddleware.requireAdmin, getUsers)

    express.get(ApiEndPoint.Admin.usersCount(), AuthMiddleware.requireAdmin, getUsersCount)
  },
}

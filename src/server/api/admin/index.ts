import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { AuthMiddleware } from '@server/middleware/auth'

import { getUsers } from './getUsers'

export const AdminApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Admin.users(), AuthMiddleware.requireAdmin, getUsers)
  },
}

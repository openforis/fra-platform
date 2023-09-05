import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getCountries } from 'server/api/admin/getCountries'
import { getCountriesCount } from 'server/api/admin/getCountriesCount'
import { getUsers } from 'server/api/admin/getUsers'
import { getUsersCount } from 'server/api/admin/getUsersCount'
import { AuthMiddleware } from 'server/middleware/auth'

export const AdminApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Admin.countries(), AuthMiddleware.requireAdmin, getCountries)
    express.get(ApiEndPoint.Admin.countriesCount(), AuthMiddleware.requireAdmin, getCountriesCount)

    express.get(ApiEndPoint.Admin.users(), AuthMiddleware.requireAdmin, getUsers)
    express.get(ApiEndPoint.Admin.usersCount(), AuthMiddleware.requireAdmin, getUsersCount)
  },
}

import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { exportUsers } from 'server/api/admin/exportUsers'
import { getCountrySummaries } from 'server/api/admin/getCountrySummaries'
import { getCountrySummariesCount } from 'server/api/admin/getCountrySummariesCount'
import { getInvitations } from 'server/api/admin/getInvitations'
import { getInvitationsCount } from 'server/api/admin/getInvitationsCount'
import { getUsers } from 'server/api/admin/getUsers'
import { getUsersCount } from 'server/api/admin/getUsersCount'
import { AuthMiddleware } from 'server/middleware/auth'

export const AdminApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Admin.countries(), AuthMiddleware.requireAdmin, getCountrySummaries)
    express.get(ApiEndPoint.Admin.countriesCount(), AuthMiddleware.requireAdmin, getCountrySummariesCount)

    express.get(ApiEndPoint.Admin.invitations(), AuthMiddleware.requireAdmin, getInvitations)
    express.get(ApiEndPoint.Admin.invitationsCount(), AuthMiddleware.requireAdmin, getInvitationsCount)

    express.get(ApiEndPoint.Admin.users(), AuthMiddleware.requireAdmin, getUsers)
    express.get(ApiEndPoint.Admin.usersCount(), AuthMiddleware.requireAdmin, getUsersCount)
    express.get(ApiEndPoint.Admin.usersExport(), AuthMiddleware.requireAdmin, exportUsers)
  },
}

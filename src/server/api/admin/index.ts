import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getCountrySummaries } from 'server/api/admin/getCountrySummaries'
import { getCountrySummariesCount } from 'server/api/admin/getCountrySummariesCount'
import { getInvitations } from 'server/api/admin/getInvitations'
import { getInvitationsCount } from 'server/api/admin/getInvitationsCount'
import { AuthMiddleware } from 'server/middleware/auth'

export const AdminApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Admin.countries(), AuthMiddleware.requireAdmin, getCountrySummaries)
    express.get(ApiEndPoint.Admin.countriesCount(), AuthMiddleware.requireAdmin, getCountrySummariesCount)

    express.get(ApiEndPoint.Admin.invitations(), AuthMiddleware.requireAdmin, getInvitations)
    express.get(ApiEndPoint.Admin.invitationsCount(), AuthMiddleware.requireAdmin, getInvitationsCount)
  },
}

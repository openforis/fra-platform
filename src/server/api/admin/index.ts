import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { exportUsers } from 'server/api/admin/exportUsers'
import { getCountrySummaries } from 'server/api/admin/getCountrySummaries'
import { getCountrySummariesCount } from 'server/api/admin/getCountrySummariesCount'
import { getInvitations } from 'server/api/admin/getInvitations'
import { getInvitationsCount } from 'server/api/admin/getInvitationsCount'
import { getUsers } from 'server/api/admin/getUsers'
import { getUsersCount } from 'server/api/admin/getUsersCount'
import { exportLinks } from 'server/api/admin/links/exportLinks'
import { getLinksCount } from 'server/api/admin/links/getLinksCount'
import { getManyLinks } from 'server/api/admin/links/getManyLinks'
import { isVerificationInProgress } from 'server/api/admin/links/isVerificationInProgress'
import { updateLink } from 'server/api/admin/links/updateLink'
import { verifyLinks } from 'server/api/admin/links/verifyLinks'
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

    express.patch(ApiEndPoint.Admin.Links.one(), AuthMiddleware.requireAdmin, updateLink)
    express.get(ApiEndPoint.Admin.Links.many(), AuthMiddleware.requireAdmin, getManyLinks)
    express.get(ApiEndPoint.Admin.Links.export(), AuthMiddleware.requireAdmin, exportLinks)
    express.get(ApiEndPoint.Admin.Links.count(), AuthMiddleware.requireAdmin, getLinksCount)
    express.post(ApiEndPoint.Admin.Links.verify(), AuthMiddleware.requireAdmin, verifyLinks)
    express.get(ApiEndPoint.Admin.Links.verifyStatus(), AuthMiddleware.requireAdmin, isVerificationInProgress)
  },
}

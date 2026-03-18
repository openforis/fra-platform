import { NextFunction, Request, Response } from 'express'

import { _next } from 'server/middleware/auth/_next'
import { _tryCatch } from 'server/middleware/auth/_tryCatch'
import { requireAdmin } from 'server/middleware/auth/admin/admin'
import { requireEditCountryProps } from 'server/middleware/auth/country/edit'
import { requireEditDescriptions, requireEditTableData } from 'server/middleware/auth/data/edit'
import { requireVerifyLinks } from 'server/middleware/auth/data/verifyLinks'
import { requireView } from 'server/middleware/auth/data/view'
import { requireViewHistory } from 'server/middleware/auth/history/view'
import { requireDeleteTopicMessage } from 'server/middleware/auth/messageTopic/delete'
import { requireEditMessageTopic } from 'server/middleware/auth/messageTopic/edit'
import { requireResolveTopic } from 'server/middleware/auth/messageTopic/resolve'
import { requireEditRepositoryItem } from 'server/middleware/auth/repositoryItem/edit'
import { requireViewRepositoryItem } from 'server/middleware/auth/repositoryItem/view'
import { requireDisassociateUserRole } from 'server/middleware/auth/user/disassociateRole'
import { requireEditUser } from 'server/middleware/auth/user/edit'
import { requireInviteUser } from 'server/middleware/auth/user/invite'
import { requireExportUsers, requireViewUser, requireViewUsers } from 'server/middleware/auth/user/view'
import { Requests } from 'server/utils'

/**
 * @deprecated.
 * This method is deprecated since it's used only in a legacy deprecated endpoint:
 * express.get(ApiEndPoint._Legacy.File.hidden(), AuthMiddleware.requireUser, getHiddenFile)
 * This endpoint will be removed in a later task
 */
const requireUser = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const user = Requests.getUser(req)

  _next(Boolean(user), next)
}

export const AuthMiddleware = {
  requireAdmin: _tryCatch(requireAdmin),
  requireDisassociateUserRole: _tryCatch(requireDisassociateUserRole),
  requireDeleteTopicMessage: _tryCatch(requireDeleteTopicMessage),
  requireEditRepositoryItem: _tryCatch(requireEditRepositoryItem),
  requireEditCountryProps: _tryCatch(requireEditCountryProps),
  requireEditDescriptions: _tryCatch(requireEditDescriptions),
  requireEditMessageTopic: _tryCatch(requireEditMessageTopic),
  requireEditTableData: _tryCatch(requireEditTableData),
  requireEditUser: _tryCatch(requireEditUser),
  requireExportUsers: _tryCatch(requireExportUsers),
  requireInviteUser: _tryCatch(requireInviteUser),
  requireResolveTopic: _tryCatch(requireResolveTopic),
  requireUser: _tryCatch(requireUser),
  requireVerifyLinks: _tryCatch(requireVerifyLinks),
  requireView: _tryCatch(requireView),
  requireViewHistory: _tryCatch(requireViewHistory),
  requireViewRepositoryItem: _tryCatch(requireViewRepositoryItem),
  requireViewUser: _tryCatch(requireViewUser),
  requireViewUsers: _tryCatch(requireViewUsers),
}

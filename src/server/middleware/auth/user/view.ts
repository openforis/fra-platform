import { NextFunction, Request, Response } from 'express'

import { CycleParams } from 'meta/api/request'
import { Cycles } from 'meta/assessment/cycles'
import { Authorizer, Users } from 'meta/user'

import { _getRequestParams } from 'server/middleware/auth/_getRequestParams'
import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

export const requireViewUser = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { countryIso, id } = _getRequestParams<CycleParams & { id: string }>(req)
  const user = Requests.getUser(req)
  const isAdministrator = Users.isAdministrator(user)
  const isSelf = String(user?.id) === String(id)

  const { cycle } = req.context

  const rolesAllowedToView = Users.getRolesAllowedToView({ user, countryIso, cycle })
  _next(isAdministrator || isSelf || rolesAllowedToView.length > 0, next)
}

export const requireViewUsers = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { countryIso, print } = _getRequestParams<CycleParams & { print?: string }>(req)
  const user = Requests.getUser(req)
  const { cycle } = req.context

  _next((print === 'true' && Cycles.isPublished(cycle)) || Authorizer.canViewUsers({ user, countryIso, cycle }), next)
}
